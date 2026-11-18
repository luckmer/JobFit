from datetime import date
from typing import Annotated

from fastapi import Depends

from database import Database, get_db
from database.query import (
    clear_duplicate_refs,
    delete_job_by_id,
    delete_job_events_by_job_id,
    delete_job_application_by_job_id,
    get_job_by_id_query,
    get_user_recent_jobs_query,
    insert_job_event,
    insert_job_offer,
    insert_job_application,
)
from schemas.job_schema import (
    CreateJobSchema,
    JobPayloadSchema,
    AppliocationsPayloadSchema,
    JobSchema,
)


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
                job.url,
                job.salary,
                job.employment_type,
                job.location,
                job.job_description,
                job.stage,
                job.notes,
                job.first_seen,
                job.last_updated,
            ),
        )

        return lastrowid

    def create_user_recent_application(
        self, job: CreateJobSchema, job_id: int
    ) -> int | None:
        lastrowid = self.db.execute(
            insert_job_application,
            (
                job_id,
                job.resume_id,
                job.applied_date,
                job.follow_up_date,
            ),
        )

        return lastrowid

    def get_job_by_id(self, id: int) -> JobSchema | None:
        row = self.db.fetch_one(get_job_by_id_query, (id,))
        return JobSchema(**row) if row else None

    def add_user_job_event(
        self, id: int, stage: str, event_date: date, note: str | None
    ):
        self.db.execute(insert_job_event, (id, stage, event_date, note))

    def _patch(self, table: str, where_col: str, where_val: int, changes: dict):
        if not changes:
            return None

        set_clause = ", ".join(f"{col} = ?" for col in changes)
        self.db.execute(
            f"UPDATE {table} SET {set_clause} WHERE {where_col} = ?",
            (*changes.values(), where_val),
        )

        return None

    def patch_job(self, id: int, payload: JobPayloadSchema):
        changes = payload.model_dump(
            mode="json", exclude_unset=True, exclude={"event_date"}
        )
        return self._patch("jobs", "id", id, changes)

    def patch_application(self, job_id: int, payload: AppliocationsPayloadSchema):
        changes = payload.model_dump(
            mode="json",
            exclude_unset=True,
        )
        return self._patch("applications", "job_id", job_id, changes)

    def delete_user_recent_job(self, id: int):
        self.get_job_by_id(id)
        self.db.execute(delete_job_events_by_job_id, (id,))
        self.db.execute(delete_job_application_by_job_id, (id,))
        self.db.execute(clear_duplicate_refs, (id,))
        self.db.execute(delete_job_by_id, (id,))


def get_jobs_repository(
    db: Annotated[Database, Depends(get_db)],
) -> JobsRepository:
    return JobsRepository(db)
