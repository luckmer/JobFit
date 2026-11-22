import hashlib
from typing import Annotated

from fastapi import Depends, HTTPException, status

from database.repositories import LLMRepository, get_llm_repository
from llm.schemas import ModelOut, ModelCapabilitiesOut, ModelLimitsOut
from llm import Opencode, get_opencode
from schemas import insertModelSchema, ActiveModelResponse
from utils import Quard, get_quard


class OpencodeService:
    def __init__(
        self, llm_repository: LLMRepository, opencode: Opencode, quard: Quard
    ) -> None:
        self.llm_repository = llm_repository
        self.opencode = opencode
        self.quard = quard

    async def get_models(self) -> list[ModelOut]:
        try:
            models = await self.opencode.get_models()
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Model provider is unavailable",
            )

        try:
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
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Invalid response from model provider",
            )

    async def set_model(self, model: insertModelSchema) -> ActiveModelResponse:
        models = await self.get_models()

        if not any(
            m.id == model.id and m.provider_id == model.provider_id for m in models
        ):
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Unknown model")

        llm_model = self.opencode.create_model(model.id, model.provider_id)

        key = self.llm_repository.build_cache_key(llm_model)

        if not self.quard.add_key(key):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Model switch already in progress",
            )

        try:
            try:
                self.llm_repository.set_active_model(llm_model)
            except Exception:
                raise HTTPException(
                    status.HTTP_500_INTERNAL_SERVER_ERROR, "Failed to set model"
                )

            return ActiveModelResponse(provider_id=model.provider_id, model_id=model.id)
        finally:
            self.quard.remove_key(key)

    def get_active_model(self):
        try:
            model = self.llm_repository.get_active_model()
            if model is None:
                default_model = self.opencode.model
                raw = self.opencode.resolve_model(default_model)
                providerID, id = raw["providerID"], raw["id"]
                return ActiveModelResponse(provider_id=providerID, model_id=id)

            raw = self.opencode.resolve_model(model.model)
            providerID, id = raw["providerID"], raw["id"]
            return ActiveModelResponse(provider_id=providerID, model_id=id)

        except Exception:
            raise HTTPException(
                status.HTTP_500_INTERNAL_SERVER_ERROR, "Failed to get model"
            )


def get_opencode_service(
    llm_repository: Annotated[LLMRepository, Depends(get_llm_repository)],
    opencode: Annotated[Opencode, Depends(get_opencode)],
    quard: Annotated[Quard, Depends(get_quard)],
) -> OpencodeService:
    return OpencodeService(llm_repository, opencode, quard)
