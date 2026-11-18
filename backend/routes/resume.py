from typing import Annotated

from fastapi import APIRouter, Depends, Form, Query, UploadFile

router = APIRouter(prefix="/v1/resume", tags=["resume"])
from services import ResumeService, get_resume_service


@router.post("/")
async def save_resume(
    file: UploadFile,
    title: Annotated[str, Form()],
    category: Annotated[str, Form()],
    resume_service: Annotated[ResumeService, Depends(get_resume_service)],
):
    return await resume_service.save_resume(file, title, category)


@router.post("/rate")
async def rate_resume_by_filename(
    filename: str,
    url: str,
    resume_service: Annotated[ResumeService, Depends(get_resume_service)],
):
    return await resume_service.rate_resume(filename, url)


@router.get("/")
def get_resume(
    resume_service: Annotated[ResumeService, Depends(get_resume_service)],
    cursor: Annotated[str | None, Query()] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
):

    return resume_service.get_resumes(cursor, limit)
