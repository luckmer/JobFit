from __future__ import annotations

import os
import secrets
from dataclasses import dataclass, field


@dataclass(frozen=True, slots=True)
class ServerAuth:
    username: str
    password: str = field(repr=False)

    @classmethod
    def from_env(cls) -> ServerAuth:
        return cls(
            username=os.environ.get("OPENCODE_SERVER_USERNAME", "opencode"),
            password=os.environ.get("OPENCODE_SERVER_PASSWORD")
            or secrets.token_urlsafe(24),
        )
