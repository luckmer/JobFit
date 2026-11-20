import asyncio
from typing import Any

import httpx

from llm.auth import ServerAuth
from llm.errors import LLMClientUnknownType, LLMUnavailable

from .config import Settings
from .schemas import (
    MessageResponse,
    PromptResponse,
    SessionResponse,
    ModelsResponse,
    InterruptedResponse,
)


class LLMClient:
    def __init__(
        self,
        url: str,
        settings: Settings,
        auth: ServerAuth,
        httpx_client: httpx.AsyncClient | None = None,
    ):
        self.url = url
        self._client = httpx_client or httpx.AsyncClient(
            timeout=httpx.Timeout(settings.server_timeout),
            auth=httpx.BasicAuth(auth.username, auth.password),
        )

    def build_url(self, path: str):
        return self.url.rstrip("/") + path

    def handle_request(self, response: httpx.Response) -> Any:
        if not response.is_success:
            raise LLMClientUnknownType

        content_type = response.headers.get("content-type", "")

        if "json" in content_type:
            return response.json()
        if content_type.startswith("text/"):
            return response.text

        raise LLMClientUnknownType

    async def request(
        self,
        method: str,
        path: str,
        json_body: Any = None,
    ):
        url = self.build_url(path)
        response = await self._client.request(method, url, json=json_body)

        return self.handle_request(response)

    async def wait_for_reply(self, session_id: str, prompt: PromptResponse) -> str:
        prompt_id = prompt.data.id

        loop = asyncio.get_running_loop()
        deadline = loop.time() + Settings.reply_timeout

        while loop.time() < deadline:
            messages = await self.list_messages(session_id)

            idx = next(
                (i for i, m in enumerate(messages.data) if m.id == prompt_id), None
            )

            content = messages.data[:idx] if idx is not None else []

            idle = next((m for m in content if m.type == "idle"), None)

            if idle and idle.outcome not in (None, "succeeded"):
                raise LLMUnavailable(f"opencode: {idle.outcome!r}")

            if idle:
                last = next(m for m in content if m.type == "assistant")

                return "".join(
                    p.text for p in last.content if p.type == "text" and p.text
                )

            await asyncio.sleep(Settings.poll_interval)

        raise TimeoutError(f"No idle message for session {session_id} within 120s")

    async def create_client_session(
        self, model: dict[str, str], **kwargs: Any
    ) -> SessionResponse:
        kwargs.setdefault("model", model)
        response = await self.request(
            "POST",
            "/api/session",
            json_body=kwargs,
        )

        return SessionResponse.model_validate(response)

    async def list_messages(self, session_id: str) -> MessageResponse:
        data = await self.request("GET", f"/api/session/{session_id}/message")
        return MessageResponse.model_validate(data)

    async def list_models(self) -> ModelsResponse:
        response = await self.request("GET", "/api/model")
        return ModelsResponse.model_validate(response)

    async def post_client_prompt(
        self,
        session_id: str,
        text: str,
        delivery: str = "queue",
        **kwargs: Any,
    ) -> PromptResponse:
        body: dict[str, Any] = {"text": text, "delivery": delivery, **kwargs}
        response = await self.request(
            "POST", f"/api/session/{session_id}/prompt", json_body=body
        )

        return PromptResponse.model_validate(response)

    async def interrupt(self, session: str) -> bool:
        response = await self.request("POST", f"/api/session/{session}/interrupt")
        return InterruptedResponse.model_validate(response).interrupted


def get_llm_client(url: str, auth: ServerAuth) -> LLMClient:
    return LLMClient(url, Settings(), auth)
