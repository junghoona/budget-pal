import os
from routers import (
    budgets,
    transactions
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(budgets.router)
app.include_router(transactions.router)

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
