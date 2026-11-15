from typing import Annotated

from fastapi import Depends, HTTPException, UploadFile

from database.repositories import ResumeRepository, get_resume_repository
from utils.constants import MAX_FILE_SIZE_BYTES
from utils.cursor import CursorPagination


class ResumeService:
    def __init__(self, resume_repository: ResumeRepository) -> None:
        self.resume_repository = resume_repository

    def save_resume(self, file: UploadFile) -> int | None:
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

        return self.resume_repository.save_resume(file)

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

        content: list[list[str]] = []


#         for resume in resumes:
#             data = resume.data
#             stream = BytesIO(data) if isinstance(data, (bytes, bytearray)) else data
#             pdf = PdfReader(stream)
#
#             if pdf.is_encrypted:
#                 if pdf.decrypt("") == 0:
#                     content.append([])
#                     continue
#
#             text = "\n".join(page.extract_text() or "" for page in pdf.pages)

# content.append(skills)

# integrate opencode cli to extract skills from resume


def get_resume_service(
    resume_repository: Annotated[ResumeRepository, Depends(get_resume_repository)],
) -> ResumeService:
    return ResumeService(resume_repository)
