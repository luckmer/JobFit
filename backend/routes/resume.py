from typing import Annotated

from fastapi import APIRouter, Depends, Query, UploadFile

router = APIRouter(prefix="/v1/resume", tags=["resume"])
from services import ResumeService, get_resume_service


@router.post("/")
def save_resume(
    file: UploadFile,
    resume_service: Annotated[ResumeService, Depends(get_resume_service)],
):
    return resume_service.save_resume(file)


@router.get("/")
async def get_resume(
    resume_service: Annotated[ResumeService, Depends(get_resume_service)],
    cursor: Annotated[str | None, Query()] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
):
    await resume_service.get_resumes(cursor, limit)
