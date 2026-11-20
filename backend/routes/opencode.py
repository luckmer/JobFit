from typing import Annotated

from fastapi import APIRouter, Depends
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
