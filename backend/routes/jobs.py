from typing import Annotated

from fastapi import APIRouter, Depends, Query

from schemas import JobPatch
from schemas.job_schema import CreateJobSchema
from services import JobsService, get_jobs_service

router = APIRouter(
    prefix="/v1/jobs",
    tags=["jobs"],
)


@router.get("/")
def get_jobs(
    jobs_service: Annotated[JobsService, Depends(get_jobs_service)],
    cursor: Annotated[str | None, Query()] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
):
    return jobs_service.get_jobs(cursor, limit)


@router.post("/")
def create_job(
    jobs_service: Annotated[JobsService, Depends(get_jobs_service)],
    job: CreateJobSchema,
):
    return jobs_service.create_job(job)


@router.patch("/{id}")
def patch_job(
    id: int,
    jobs_service: Annotated[JobsService, Depends(get_jobs_service)],
    payload: JobPatch,
):
    return jobs_service.patch_job(id, payload)


@router.delete("/{id}")
def delete_job(
    id: int,
    jobs_service: Annotated[JobsService, Depends(get_jobs_service)],
) -> None:
    return jobs_service.delete_job(id)
