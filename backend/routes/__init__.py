from .health import router as health_router
from .jobs import router as jobs_router
from .resume import router as resume_router

__all__ = ["health_router", "jobs_router", "resume_router"]
