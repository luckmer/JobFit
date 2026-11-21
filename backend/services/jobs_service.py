from typing import Annotated

from fastapi import Depends, HTTPException, status

from database.repositories import JobsRepository, get_jobs_repository
from schemas import JobPatch
from schemas.job_schema import CreateJobSchema, JobSchema, JobsResponse
from utils.constants import STATUSES
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
            try:
                decoded = CursorPagination.decode_cursor(cursor)
            except Exception:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid cursor",
                )
            offset = decoded.offset
            position = decoded.position

        try:
            jobs = self.jobs_repository.get_user_recent_jobs(
                position or 0,
                limit + 1,
            )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to fetch jobs",
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
        if job.stage not in STATUSES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid stage",
            )

        try:
            job_id = self.jobs_repository.create_user_recent_job(job)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create job",
            )

        if job_id is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create job",
            )

        try:
            self.jobs_repository.create_user_recent_application(job, job_id)
            self.jobs_repository.add_user_job_event(
                job_id, job.stage, job.event_date, None
            )

            created_job = self.jobs_repository.get_job_by_id(job_id)
            if created_job is None:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Job was created but could not be retrieved",
                )
        except Exception as exc:
            try:
                self.jobs_repository.delete_user_recent_job(job_id)
            except Exception:
                pass

            if isinstance(exc, HTTPException):
                raise

            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create job",
            )

        return created_job

    def patch_job(self, job_id: int, payload: JobPatch) -> JobSchema:
        try:
            job = self.jobs_repository.get_job_by_id(job_id)

            if job is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Job not found",
                )

            if payload.job_payload is not None:
                self.jobs_repository.patch_job(job_id, payload.job_payload)
                self.jobs_repository.add_user_job_event(
                    job_id,
                    payload.job_payload.stage,
                    payload.job_payload.event_date,
                    payload.job_payload.notes,
                )

            if payload.applications_payload is not None:
                self.jobs_repository.patch_application(
                    job_id, payload.applications_payload
                )

            updated_job = self.jobs_repository.get_job_by_id(job_id)

            if updated_job is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Job not found",
                )

            return updated_job
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update job",
            )

    def delete_job(self, id: int) -> None:
        try:
            self.jobs_repository.delete_user_recent_job(id)
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete job",
            )


def get_jobs_service(
    jobs_repository: Annotated[JobsRepository, Depends(get_jobs_repository)],
) -> JobsService:
    return JobsService(jobs_repository)
