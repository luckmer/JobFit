from typing import Annotated

from fastapi import Depends

from database import Database, get_db
from database.query import (
    clear_duplicate_refs,
    delete_job_by_id,
    delete_job_events_by_job_id,
    delete_job_rankings_by_job_id,
    get_job_by_id_query,
    get_user_recent_jobs_query,
    insert_job_event,
    insert_job_offer,
)
from schemas.job_schema import CreateJobSchema, JobPatch, JobSchema


class JobsRepository:
    def __init__(self, db: Database) -> None:
        self.db = db

    def get_user_recent_jobs(self, offset: int = 0, limit: int = 10) -> list[JobSchema]:
        rows = self.db.fetch_all(get_user_recent_jobs_query, (limit, offset))
        return [JobSchema(**row) for row in rows]

    def create_user_recent_job(self, job: CreateJobSchema) -> int | None:
        lastrowid = self.db.execute(
            insert_job_offer,
            (
                job.key,
                job.title,
                job.company,
                str(job.url),
                job.location,
                job.status,
                job.stage,
                job.first_seen.isoformat(),
                job.last_updated.isoformat(),
            ),
        )
        self.db.execute(insert_job_event, (lastrowid, job.stage, job.event_date, None))

        return lastrowid

    def get_job_by_id(self, id: int | None) -> JobSchema:
        row = self.db.fetch_one(get_job_by_id_query, (id,))

        if row is None:
            raise RuntimeError(f"Job {id} not found right after insert")

        return JobSchema(**row)

    def patch_user_recent_job(self, id: int, payload: JobPatch) -> int | None:

        self.get_job_by_id(id)

        changes = payload.model_dump(exclude_unset=True)

        if not changes:
            return None
        set_clause = ", ".join(f"{col} = ?" for col in changes)

        self.db.execute(
            f"UPDATE jobs SET {set_clause} WHERE id = ?",
            (*changes.values(), id),
        )

        return id

    def delete_user_recent_job(self, id: int):
        self.get_job_by_id(id)
        self.db.execute(delete_job_events_by_job_id, (id,))
        self.db.execute(delete_job_rankings_by_job_id, (id,))
        self.db.execute(clear_duplicate_refs, (id,))
        self.db.execute(delete_job_by_id, (id,))


def get_jobs_repository(
    db: Annotated[Database, Depends(get_db)],
) -> JobsRepository:
    return JobsRepository(db)
