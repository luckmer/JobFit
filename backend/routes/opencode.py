from typing import Annotated

from fastapi import APIRouter, Depends
from schemas import insertModelSchema
from services import OpencodeService, get_opencode_service

router = APIRouter(
    prefix="/v1/opencode",
    tags=["opencode"],
)


@router.get("/")
async def get_models(
    opencode_service: Annotated[OpencodeService, Depends(get_opencode_service)],
):
    return await opencode_service.get_models()


@router.post("/")
async def set_model(
    model: insertModelSchema,
    opencode_service: Annotated[OpencodeService, Depends(get_opencode_service)],
):
    return await opencode_service.set_model(model)


@router.get("/active")
def get_active_model(
    opencode_service: Annotated[OpencodeService, Depends(get_opencode_service)],
):
    return opencode_service.get_active_model()
