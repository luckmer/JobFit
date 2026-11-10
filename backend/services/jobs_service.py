from fastapi import Depends

from database.repositories import JobsRepository, get_jobs_repository
from schemas.job_schema import CreateJobSchema, JobsResponse
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

    def create_job(self, job: CreateJobSchema) -> None:
        self.jobs_repository.create_user_recent_job(job)


def get_jobs_service(
    jobs_repository: JobsRepository = Depends(get_jobs_repository),
) -> JobsService:
    return JobsService(jobs_repository)
