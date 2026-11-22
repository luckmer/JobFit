# How to Run the Project

## Requirements

- [uv](https://docs.astral.sh/uv/) – (backend)
- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (frontend)

## Backend

In the backend directory, install dependencies:

```bash
uv sync
```

Start the development server:

```bash
uv run fastapi dev
```

By default the API runs at `http://127.0.0.1:8000`, and the automatic docs are available at `http://127.0.0.1:8000/docs`.

## Frontend

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The app's address will be printed in the terminal once it starts.

## Quick Start

```bash
# terminal 1 – backend
uv sync
uv run fastapi dev

# terminal 2 – frontend
pnpm install
pnpm dev
```