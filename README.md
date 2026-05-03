# Court Reporting Workflow Manager

A workflow system for managing transcription jobs — assigning reporters and editors, tracking job status, and calculating payments.

## Tech Stack

- **Runtime:** Bun
- **Backend:** Express 5, Prisma 7, PostgreSQL, Zod
- **Frontend:** React 19, Vite 8, Tailwind CSS 4, shadcn/ui

## Project Structure

```
vsc-test/
├── apps/
│   ├── backend/    # Express API (port 3001)
│   └── frontend/   # React SPA (port 5173)
└── db/             # SQL scripts & schema diagram
```

## Setup

> **Note:** We recommend using the [Docker setup](#docker-recommended) below for zero-config setup.
> The manual setup below is only needed if you don't have Docker installed.

### Prerequisites

- [Bun](https://bun.sh)
- PostgreSQL

### Installation

```bash
# 1. Install dependencies
bun install

# 2. Configure backend
cd apps/backend
cp .env.example .env
# Edit .env — set DATABASE_URL

# 3. Generate Prisma client and run migrations
bun run prisma:generate
bun run prisma:migrate

# 4. Seed database (optional)
bun run prisma:seed
```

## Docker (Recommended)

Run the entire stack (PostgreSQL + Backend + Frontend) with Docker Compose.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

### Quick Start

```bash
# 1. Verify prerequisites
make setup

# 2. Start development environment
make dev

# 3. Seed the database (in another terminal)
make seed
```

The app is now running at:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **Health check:** http://localhost:3001/api/health

### Production Mode

For a static production build:

```bash
make prod
```

This builds optimized images and serves the frontend via nginx on port 80.

### Common Commands

| Command               | Description                        |
| --------------------- | ---------------------------------- |
| `make dev`            | Start dev environment (hot reload) |
| `make prod`           | Start production environment       |
| `make seed`           | Seed the database                  |
| `make down`           | Stop all containers                |
| `make logs`           | View live logs                     |
| `make logs-backend`   | View backend logs                  |
| `make logs-frontend`  | View frontend logs                 |
| `make shell-backend`  | Open shell in backend container    |
| `make shell-frontend` | Open shell in frontend container   |

## Running

```bash
# Backend (port 3001, hot reload)
cd apps/backend
bun run dev

# Frontend (port 5173)
cd apps/frontend
bun run dev
```

## Environment Variables

| Variable       | Description           | Default                 |
| -------------- | --------------------- | ----------------------- |
| `DATABASE_URL` | PostgreSQL connection | _(required)_            |
| `PORT`         | Backend listen port   | `3001`                  |
| `FRONTEND_URL` | CORS origin           | `http://localhost:5173` |
| `NODE_ENV`     | Environment           | —                       |

## API Endpoints

### Jobs

| Method  | Path                     | Description                  |
| ------- | ------------------------ | ---------------------------- |
| `POST`  | `/api/jobs`              | Create a job                 |
| `GET`   | `/api/jobs`              | List all jobs                |
| `GET`   | `/api/jobs/:id`          | Get job details              |
| `PUT`   | `/api/jobs/:id`          | Update job                   |
| `PATCH` | `/api/jobs/:id/status`   | Update job status            |
| `PATCH` | `/api/jobs/:id/reporter` | Assign reporter              |
| `PATCH` | `/api/jobs/:id/editor`   | Assign editor                |
| `PATCH` | `/api/jobs/:id/complete` | Complete job & calculate pay |

### Employees

| Method | Path                 | Description                 |
| ------ | -------------------- | --------------------------- |
| `GET`  | `/api/employees`     | List employees (filterable) |
| `GET`  | `/api/employees/:id` | Get employee details        |

**Query params for `GET /api/employees`:** `role`, `city`, `country`, `availability`

### Health

| Method | Path          | Description  |
| ------ | ------------- | ------------ |
| `GET`  | `/api/health` | Health check |
