from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routers import (
    budgets,
    transactions
)
from mangum import Mangum


app = FastAPI()
app.include_router(budgets.router)
app.include_router(transactions.router)
handler = Mangum(app)

# Allow all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
