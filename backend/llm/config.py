import re
from dataclasses import dataclass

URL_RE = re.compile(r"on\s+(https?://\S+)")


@dataclass(frozen=True)
class Settings:
    hostname: str = "127.0.0.1"
    server_timeout: float = 30.0
    request_timeout: float = 300.0
    reply_timeout: float = 120.0
    poll_interval: float = 0.5
    max_retries: int = 2
    retry_backoff: float = 0.5
    directory: str | None = None
    workspace: str | None = None
