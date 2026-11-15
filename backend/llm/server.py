import os
import shutil
import socket
import subprocess
import threading

from llm.auth import ServerAuth

from .config import URL_RE, Settings


class LLMServer:
    def __init__(self, auth: ServerAuth) -> None:
        self._auth = auth
        self.url: str | None = None
        self._proc: subprocess.Popen | None = None

    @property
    def running(self) -> bool:
        return self._proc is not None and self._proc.poll() is None

    def get_opencode_binary(self, name="opencode"):
        binary = shutil.which(name)

        if binary is None:
            raise FileNotFoundError("opencode was not found in PATH")

        return binary

    def find_free_port(self):

        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(("", 0))
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            return s.getsockname()[1]

    def read_output(self, proc: subprocess.Popen, ready: threading.Event) -> None:
        assert proc.stdout is not None
        for line in proc.stdout:
            if self.url is None and (m := URL_RE.search(line)):
                self.url = m.group(1)
                ready.set()
        ready.set()

    def start(self):
        if self.running:
            return

        binary = self.get_opencode_binary()
        port = self.find_free_port()

        self.url = None
        self._proc = subprocess.Popen(
            [binary, "serve", "--hostname", Settings.hostname, "--port", str(port)],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace",
            env={
                **os.environ,
                "OPENCODE_SERVER_USERNAME": self._auth.username,
                "OPENCODE_SERVER_PASSWORD": self._auth.password,
            },
        )

        ready = threading.Event()

        threading.Thread(
            target=self.read_output, args=(self._proc, ready), daemon=True
        ).start()

        if not ready.wait(Settings.server_timeout):
            self.stop()
            raise TimeoutError("Timed out waiting for server to start")

        if self.url is None:
            self.stop()
            raise RuntimeError("Failed to start server")

    def stop(self):
        if self._proc:
            self._proc.terminate()
            try:
                self._proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self._proc.kill()
                self._proc.wait()
            self._proc = None
            self.url = None


def get_llm_server(auth: ServerAuth) -> LLMServer:
    server = LLMServer(auth)
    server.start()

    return server
