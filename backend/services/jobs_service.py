from fastapi import Depends

from database.repositories import JobsRepository, get_jobs_repository


class JobsService:
    def __init__(self, jobs_repository: JobsRepository):
        self.jobs_repository = jobs_repository


def get_jobs_service(
    jobs_repository: JobsRepository = Depends(get_jobs_repository),
) -> JobsService:
    return JobsService(jobs_repository)
