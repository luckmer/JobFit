import hashlib
from typing import Annotated

from fastapi import Depends

from database.repositories import LLMCacheRepository, get_llm_cache_repository
from llm.schemas import ModelOut, ModelCapabilitiesOut, ModelLimitsOut
from llm import Opencode, get_opencode


class OpencodeService:
    def __init__(self, cache: LLMCacheRepository, opencode: Opencode) -> None:
        self.cache = cache
        self.opencode = opencode

    @staticmethod
    def build_cache_key(model: str, text: str) -> str:
        return hashlib.sha256(f"{model}:{text}".encode("utf-8")).hexdigest()

    async def get_models(self) -> list[ModelOut]:
        models = await self.opencode.get_models()

        response: list[ModelOut] = []

        for model in models.data:
            response.append(
                ModelOut(
                    id=model.id,
                    name=model.name,
                    provider_id=model.provider_id,
                    family=model.family,
                    capabilities=ModelCapabilitiesOut(
                        tools=model.capabilities.tools,
                        image_input="image" in model.capabilities.input,
                        reasoning=bool(model.variants),
                    ),
                    limits=ModelLimitsOut(
                        context=model.limit.context,
                        output=model.limit.output,
                    ),
                    reasoning_efforts=[v.id for v in model.variants],
                    free=all(c.input == 0 and c.output == 0 for c in model.cost),
                    released_at=model.time.released,
                )
            )

        return response


def get_opencode_service(
    cache: Annotated[LLMCacheRepository, Depends(get_llm_cache_repository)],
    opencode: Annotated[Opencode, Depends(get_opencode)],
) -> OpencodeService:
    return OpencodeService(cache, opencode)
