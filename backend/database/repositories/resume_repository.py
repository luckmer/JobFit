from typing import Annotated

from fastapi import Depends, UploadFile

from database import Database, get_db
from database.query import get_resumes, insert_resume, select_resume_by_filename
from schemas import Resume, ResumeSchema


class ResumeRepository:
    def __init__(self, db: Database) -> None:
        self.db = db

    def save_resume(
        self, file: UploadFile, skills: str, data: str, title: str, category: str
    ) -> int | None:

        return self.db.execute(
            insert_resume,
            (
                file.filename,
                file.content_type or "application/pdf",
                data,
                skills,
                title,
                category,
            ),
        )

    def get_resume_data(self, filename: str) -> str | None:
        row = self.db.fetch_one(select_resume_by_filename, (filename,))
        if row is None:
            return None
        return ResumeSchema(**row).data

    def get_resume_by_filename(self, filename: str) -> Resume | None:
        rows = self.db.fetch_one(select_resume_by_filename, (filename,))
        return Resume(**rows) if rows else None

    def get_resumes(self, offset: int = 0, limit: int = 10) -> list[Resume]:
        rows = self.db.fetch_all(get_resumes, (limit, offset))
        return [Resume(**row) for row in rows]


def get_resume_repository(
    db: Annotated[Database, Depends(get_db)],
) -> ResumeRepository:
    return ResumeRepository(db)
