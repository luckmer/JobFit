from fastapi import APIRouter, UploadFile

router = APIRouter(prefix="/v1/resume", tags=["resume"])


@router.post("/")
def save_resume(file: UploadFile):
    pass


@router.get("/")
def get_resume():
    pass
