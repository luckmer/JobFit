from typing import Annotated

from fastapi import Depends

from database import Database, get_db
from database.query import (
    get_user_recent_jobs_query,
    insert_job_event,
    insert_job_offer,
)
from schemas.job_schema import CreateJobSchema, JobSchema


class JobsRepository:
    def __init__(self, db: Database) -> None:
        self.db = db

    def get_user_recent_jobs(self, offset: int = 0, limit: int = 10) -> list[JobSchema]:
        rows = self.db.fetch_all(get_user_recent_jobs_query, (limit, offset))
        return [JobSchema(**row) for row in rows]

    def create_user_recent_job(self, job: CreateJobSchema) -> None:
        lastrowid = self.db.execute(
            insert_job_offer,
            (
                job.key,
                job.title,
                job.company,
                str(job.url),
                job.status,
                job.stage,
                job.first_seen.isoformat(),
                job.first_seen.isoformat(),
            ),
        )
        self.db.execute(insert_job_event, (lastrowid, job.stage, job.event_date, None))


def get_jobs_repository(
    db: Annotated[Database, Depends(get_db)],
) -> JobsRepository:
    return JobsRepository(db)
