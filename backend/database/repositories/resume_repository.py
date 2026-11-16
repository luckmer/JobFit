from typing import Annotated

from fastapi import Depends, UploadFile

from database import Database, get_db
from database.query import get_resumes, insert_resume, select_resume_by_filename
from schemas.resume_schema import ResumeSchema


class ResumeRepository:
    def __init__(self, db: Database) -> None:
        self.db = db

    def save_resume(self, file: UploadFile, skills: str, data: str) -> int | None:

        return self.db.execute(
            insert_resume,
            (
                file.filename,
                file.content_type or "application/pdf",
                data,
                skills,
            ),
        )

    def get_resume_by_filename(self, filename: str) -> ResumeSchema | None:
        rows = self.db.fetch_one(select_resume_by_filename, (filename,))
        return ResumeSchema(**rows) if rows else None

    def get_resumes(self, offset: int = 0, limit: int = 10) -> list[ResumeSchema]:
        rows = self.db.fetch_all(get_resumes, (limit, offset))

        return [ResumeSchema(**row) for row in rows]


def get_resume_repository(
    db: Annotated[Database, Depends(get_db)],
) -> ResumeRepository:
    return ResumeRepository(db)
