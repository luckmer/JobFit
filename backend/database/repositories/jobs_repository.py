from typing import Annotated

from fastapi import Depends

from database import Database, get_db


class JobsRepository:
    def __init__(self, db: Database) -> None:
        self.db = db


def get_jobs_repository(
    db: Annotated[Database, Depends(get_db)],
) -> JobsRepository:
    return JobsRepository(db)
