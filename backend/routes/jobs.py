from typing import Annotated

from fastapi import APIRouter, Depends

from services import JobsService, get_jobs_service

router = APIRouter(
    prefix="/v1/jobs",
    tags=["jobs"],
)


@router.get("/")
async def get_jobs(
    jobs_service: Annotated[JobsService, Depends(get_jobs_service)],
):
    return
