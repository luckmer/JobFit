from typing import Annotated

from fastapi import Depends, HTTPException, UploadFile

from database.repositories import ResumeRepository, get_resume_repository
from utils.constants import MAX_FILE_SIZE_BYTES
from utils.cursor import CursorPagination
from llm import Opencode, get_opencode, CV_SKILLS_PROMPT
from pypdf import PdfReader
from schemas import ResumesResponse


class ResumeService:
    def __init__(self, resume_repository: ResumeRepository, opencode: Opencode) -> None:
        self.resume_repository = resume_repository
        self.opencode = opencode

    def extract_text(self, file: UploadFile) -> str:
        pdf = PdfReader(file.file)
        text = "\n".join(page.extract_text() or "" for page in pdf.pages)
        return text

    async def extract_skills(self, text: str) -> str:

        prompt = CV_SKILLS_PROMPT.replace("{cv_text}", text)

        skills = await self.opencode.prompt(prompt)
        return skills

    async def save_resume(self, file: UploadFile) -> int | None:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Invalid file type")

        if file.filename is None:
            raise HTTPException(status_code=400, detail="Invalid file name")

        if file.size is None:
            raise HTTPException(status_code=400, detail="Invalid file size")

        if file.size > MAX_FILE_SIZE_BYTES:
            raise HTTPException(status_code=413, detail="File too large")

        header = file.file.read(5)
        file.file.seek(0)
        if header != b"%PDF-":
            raise HTTPException(status_code=400, detail="Invalid file type")

        if self.resume_repository.get_resume_by_filename(file.filename) is not None:
            raise HTTPException(status_code=409, detail="Resume already exists")

        text = self.extract_text(file)
        skills = await self.extract_skills(text)

        return self.resume_repository.save_resume(file, skills, text)

    async def get_resumes(
        self,
        cursor: str | None = None,
        limit: int = 10,
    ):

        offset = 0
        position = None

        if cursor is not None:
            decoded = CursorPagination.decode_cursor(cursor)
            offset = decoded.offset
            position = decoded.position

        resumes = self.resume_repository.get_resumes(position or 0, limit + 1)

        has_next = len(resumes) > limit
        resumes = resumes[:limit]

        next_cursor = None

        if has_next and resumes:
            next_cursor = CursorPagination.encode_cursor(
                offset=offset + limit,
                position=resumes[-1].id,
            )

        return ResumesResponse(
            resumes=resumes,
            next_cursor=next_cursor,
        )


def get_resume_service(
    resume_repository: Annotated[ResumeRepository, Depends(get_resume_repository)],
    opencode: Annotated[Opencode, Depends(get_opencode)],
) -> ResumeService:
    return ResumeService(resume_repository, opencode)
