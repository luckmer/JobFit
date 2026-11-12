from typing import Annotated

from fastapi import Depends

from database.repositories import JobsRepository, get_jobs_repository
from schemas import JobPatch
from schemas.job_schema import CreateJobSchema, JobSchema, JobsResponse
from utils.cursor import CursorPagination


class JobsService:
    def __init__(self, jobs_repository: JobsRepository) -> None:
        self.jobs_repository = jobs_repository

    def get_jobs(
        self,
        cursor: str | None = None,
        limit: int = 10,
    ) -> JobsResponse:

        offset = 0
        position = None

        if cursor is not None:
            decoded = CursorPagination.decode_cursor(cursor)
            offset = decoded.offset
            position = decoded.position

        jobs = self.jobs_repository.get_user_recent_jobs(
            position or 0,
            limit + 1,
        )

        has_next = len(jobs) > limit
        jobs = jobs[:limit]

        next_cursor = None

        if has_next and jobs:
            next_cursor = CursorPagination.encode_cursor(
                offset=offset + limit,
                position=jobs[-1].id,
            )

        return JobsResponse(
            jobs=jobs,
            next_cursor=next_cursor,
        )

    def create_job(self, job: CreateJobSchema) -> JobSchema:
        id = self.jobs_repository.create_user_recent_job(job)
        return self.jobs_repository.get_job_by_id(id)

    def patch_job(self, id: int, payload: JobPatch) -> JobSchema:
        self.jobs_repository.patch_user_recent_job(id, payload)
        self.jobs_repository.add_user_job_event(
            id, payload.stage, payload.event_date, payload.notes
        )
        return self.jobs_repository.get_job_by_id(id)

    def delete_job(self, id: int) -> None:
        self.jobs_repository.delete_user_recent_job(id)


def get_jobs_service(
    jobs_repository: Annotated[JobsRepository, Depends(get_jobs_repository)],
) -> JobsService:
    return JobsService(jobs_repository)
