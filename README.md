# Budget Pal

Budget Pal is a personal finance web app for tracking budgets and transactions across bank accounts. Users can create budgets, log transactions against them, and see spending broken down by budget and bank.

## Features

- Create, view, update, and delete budgets
- List budgets by bank
- Create, view, update, and delete transactions
- View transactions scoped to a specific budget
- Search transactions/budgets from the UI

## Tech Stack

**Backend (`api/`)**
- [FastAPI](https://fastapi.tiangolo.com/) — Python web framework
- [Psycopg 3](https://www.psycopg.org/psycopg3/) — PostgreSQL driver
- [Pydantic](https://docs.pydantic.dev/) — request/response models and validation
- [Mangum](https://mangum.io/) — AWS Lambda adapter for the FastAPI app
- [Uvicorn](https://www.uvicorn.org/) — ASGI server
- [Black](https://black.readthedocs.io/) / [Flake8](https://flake8.pycqa.org/) — formatting and linting

**Frontend (`ghi/`)**
- [React 18](https://react.dev/) (Create React App)
- [React Router](https://reactrouter.com/) — client-side routing
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [localforage](https://github.com/localForage/localForage) — client-side storage
- [AOS](https://michalsnik.github.io/aos/) — scroll animations
- [react-icons](https://react-icons.github.io/react-icons/), [reactjs-popup](https://github.com/yjose/react-js-popup) — UI components

**Data & Infra**
- [PostgreSQL 14](https://www.postgresql.org/) — primary database
- [Docker Compose](https://docs.docker.com/compose/) — local multi-service orchestration
- Deployed backend on [Google Cloud Run](https://cloud.google.com/run) (FastAPI) and database on [AWS RDS](https://aws.amazon.com/rds/)

## Project Structure

```
budget-pal/
├── api/                  # FastAPI backend
│   ├── main.py           # App entrypoint, router registration, CORS
│   ├── routers/          # Route handlers (budgets, transactions)
│   ├── queries/          # Database access layer
│   └── requirements.txt
├── ghi/                  # React frontend
│   └── src/
│       ├── Components/
│       │   ├── Budgets/
│       │   ├── Transactions/
│       │   └── Home/
│       └── App.js
└── docker-compose.yaml   # postgres + fastapi + ghi services
```

## Setup

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- Node.js and npm (if running the frontend outside Docker)
- Python 3.10+ (if running the backend outside Docker)

### 1. Configure environment variables

Create a `.env` file in the project root (this file is gitignored and must never be committed):

```
POSTGRES_DB=postgres
POSTGRES_USER=<your-db-user>
POSTGRES_PASSWORD=<your-db-password>
POSTGRES_HOST=<your-db-host>
POSTGRES_PORT=5432

SIGNING_KEY=<a-secret-signing-key>
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
REACT_APP_API_HOST=http://localhost:8000
```

### 2. Run with Docker Compose

```bash
docker compose up --build
```

This starts three services:

| Service   | Port | Description                     |
|-----------|------|----------------------------------|
| `postgres`| 5432 | PostgreSQL database              |
| `fastapi` | 8000 | Backend API (auto-reloads)       |
| `ghi`     | 3000 | React frontend (`npm start`)     |

Once running:
- Frontend: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:8000](http://localhost:8000)
- Interactive API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Running services individually (without Docker)

**Backend**
```bash
cd api
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend**
```bash
cd ghi
npm install
npm run start
```

## API Overview

| Method | Path                                   | Description                       |
|--------|-----------------------------------------|------------------------------------|
| GET    | `/api/budgets/`                        | List all budgets                   |
| POST   | `/api/budgets/`                        | Create a budget                    |
| GET    | `/api/budgets/{budget_id}/`            | Get a single budget                |
| PUT    | `/api/budgets/{budget_id}/`            | Update a budget                    |
| DELETE | `/api/budgets/{budget_id}/`            | Delete a budget                    |
| GET    | `/api/banks/`                          | List banks                         |
| GET    | `/api/banks/{bank}/budgets/`           | List budgets for a bank            |
| GET    | `/api/transactions/`                   | List all transactions              |
| POST   | `/api/transactions/`                   | Create a transaction               |
| GET    | `/api/transactions/{transaction_id}/`  | Get a single transaction           |
| PUT    | `/api/transactions/{transaction_id}/`  | Update a transaction               |
| DELETE | `/api/transactions/{transaction_id}/`  | Delete a transaction               |
| GET    | `/api/budgets/{budget_id}/transactions/` | List transactions for a budget   |

## Testing & Linting

```bash
# Backend
cd api
flake8 .
black .

# Frontend
cd ghi
npm test
```
