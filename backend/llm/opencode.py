from llm.auth import ServerAuth
from llm.errors import LLMClientError, LLMModelError

from .client import LLMClient, get_llm_client
from .schemas import SessionResponse
from .server import LLMServer, get_llm_server


class Opencode:
    def __init__(self) -> None:
        self.model = "opencode/deepseek-v4.1-flash-free"
        self._server: LLMServer | None = None
        self._client: LLMClient | None = None

    def start(self) -> None:
        if self._client is not None:
            return

        auth = ServerAuth.from_env()
        server = get_llm_server(auth)

        url = server.url
        if url is None:
            server.stop()
            raise RuntimeError("Opencode server started but did not provide a URL")

        self._server = server
        self._client = get_llm_client(url, auth)

    def close(self) -> None:
        if self._server is not None:
            self._server.stop()
            self._server = self._client = None

    def resolve_model(self, model: str) -> dict[str, str]:
        provider, id = model.split("/", 1)

        if provider and id is not None:
            return {"providerID": provider, "id": id}

        raise LLMModelError(provider, id)

    async def create_session(self) -> SessionResponse:
        if self._client is None:
            raise LLMClientError

        model = self.resolve_model(self.model)
        session = await self._client.create_client_session(model)

        return session

    async def prompt(self, text: str):
        if self._client is None:
            raise LLMClientError

        session = await self.create_session()
        session_ID = session.data.id

        prompt = await self._client.post_client_prompt(session_ID, text)
        return await self._client.wait_for_reply(session_ID, prompt)


opencode = Opencode()


def get_opencode() -> Opencode:
    return opencode
