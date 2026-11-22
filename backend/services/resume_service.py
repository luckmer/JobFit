from sqlite3 import IntegrityError
from typing import Annotated

from fastapi import Depends, HTTPException, UploadFile
from pypdf import PdfReader

from database.repositories import (
    LLMRepository,
    ResumeRepository,
    get_llm_repository,
    get_resume_repository,
)
from llm import CV_RATE_PROMPT, CV_SKILLS_PROMPT, Opencode, get_opencode
from schemas import ResumeRatingResponse, ResumesResponse, Resume
from utils import MAX_FILE_SIZE_BYTES, CursorPagination, Quard, get_quard


class ResumeService:
    def __init__(
        self,
        llm_repository: LLMRepository,
        resume_repository: ResumeRepository,
        opencode: Opencode,
        quard: Quard,
    ) -> None:
        self.llm_repository = llm_repository
        self.resume_repository = resume_repository
        self.opencode = opencode
        self.quard = quard

    def extract_text(self, file: UploadFile) -> str:
        pdf = PdfReader(file.file)
        text = "\n".join(page.extract_text() or "" for page in pdf.pages)
        return text

    async def extract_skills(self, text: str) -> str:
        model = self.llm_repository.get_active_model()
        if model is not None:
            self.opencode.insert_model(model.model)

        prompt = CV_SKILLS_PROMPT.replace("{cv_text}", text)
        skills = await self.opencode.prompt(prompt)
        return skills

    async def save_resume(self, file: UploadFile, title: str, category: str) -> Resume:
        if file.filename is None:
            raise HTTPException(status_code=400, detail="Invalid file name")

        try:
            existing = self.resume_repository.get_resume_by_filename(file.filename)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to check resume")

        if existing is not None:
            raise HTTPException(status_code=409, detail="Resume already exists")

        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Invalid file type")

        if file.size is None:
            raise HTTPException(status_code=400, detail="Invalid file size")

        if file.size > MAX_FILE_SIZE_BYTES:
            raise HTTPException(status_code=413, detail="File too large")

        try:
            header = file.file.read(5)
            file.file.seek(0)
        except Exception:
            raise HTTPException(status_code=400, detail="Could not read file")

        if header != b"%PDF-":
            raise HTTPException(status_code=400, detail="Invalid file type")

        try:
            text = self.extract_text(file)
        except Exception:
            raise HTTPException(status_code=422, detail="Could not read PDF")

        key = self.llm_repository.build_cache_key(file.filename)

        if not self.quard.add_key(key):
            raise HTTPException(
                status_code=409, detail="Resume is already being processed"
            )

        try:
            try:
                skills = await self.extract_skills(text)
            except Exception:
                raise HTTPException(status_code=502, detail="Failed to extract skills")

            self.resume_repository.save_resume(file, skills, text, title, category)
            resume = self.resume_repository.get_resume_by_filename(file.filename)

            if resume is None:
                raise HTTPException(status_code=404, detail="Resume not found")

            return resume
        except HTTPException:
            raise
        except IntegrityError:
            raise HTTPException(status_code=409, detail="Resume already exists")
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to save resume")
        finally:
            self.quard.remove_key(key)

    async def rate_resume(self, filename: str, url: str) -> ResumeRatingResponse:
        cache_id = self.llm_repository.build_cache_key(
            filename + url + self.opencode.model
        )

        try:
            cache = self.llm_repository.get(cache_id)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to read cache")

        if cache is not None:
            return ResumeRatingResponse(rating=cache.message)

        try:
            content = self.resume_repository.get_resume_data(filename)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to load resume")

        if content is None:
            raise HTTPException(status_code=404, detail="Resume not found")

        prompt = CV_RATE_PROMPT.replace("{cv_text}", content).replace("{job_url}", url)

        if not self.quard.add_key(cache_id):
            raise HTTPException(
                status_code=409, detail="Rating is already being generated"
            )

        try:
            try:
                model = self.llm_repository.get_active_model()
                if model is not None:
                    self.opencode.insert_model(model.model)

                rating = await self.opencode.prompt(prompt)
            except Exception:
                raise HTTPException(status_code=502, detail="Failed to generate rating")

            try:
                self.llm_repository.save(cache_id, rating)
            except Exception:
                raise HTTPException(status_code=500, detail="Failed to save rating")

            return ResumeRatingResponse(rating=rating)
        finally:
            self.quard.remove_key(cache_id)

    def get_resumes(
        self,
        cursor: str | None = None,
        limit: int = 10,
    ) -> ResumesResponse:
        offset = 0
        position = None

        if cursor is not None:
            try:
                decoded = CursorPagination.decode_cursor(cursor)
            except Exception:
                raise HTTPException(status_code=400, detail="Invalid cursor")
            offset = decoded.offset
            position = decoded.position

        try:
            resumes = self.resume_repository.get_resumes(position or 0, limit + 1)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to fetch resumes")

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

    def delete_resume(self, id: int) -> None:
        resume = self.resume_repository.get_resume_by_id(id)

        if resume is None:
            raise HTTPException(status_code=404, detail="Resume not found")

        try:
            return self.resume_repository.delete_resume(id)
        except Exception:
            raise HTTPException(status_code=500, detail="Failed to delete resume")


def get_resume_service(
    llm_repository: Annotated[LLMRepository, Depends(get_llm_repository)],
    resume_repository: Annotated[ResumeRepository, Depends(get_resume_repository)],
    opencode: Annotated[Opencode, Depends(get_opencode)],
    quard: Annotated[Quard, Depends(get_quard)],
) -> ResumeService:
    return ResumeService(llm_repository, resume_repository, opencode, quard)
