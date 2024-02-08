from typing import List, Union
from fastapi import (
    APIRouter,
    Depends,
    Response
)
from queries.transactions import (
    TransactionIn,
    TransactionOut,
    TransactionInfoOut,
    UpdateTransactionIn,
    TransactionRepository,
    Error
)


router = APIRouter()


@router.post("/api/transactions/", response_model=Union[TransactionOut, Error])
def create_transaction(
    transaction: TransactionIn,
    response: Response,
    repo: TransactionRepository = Depends()
):
    result = repo.create(transaction)
    if result is None:
        response.status_code = 404
    return result


@router.get("/api/transactions/", response_model=Union[List[TransactionInfoOut], Error])
def get_transactions(
    repo: TransactionRepository = Depends()
):
    return repo.get_all()


@router.get("/api/transactions/{transaction_id}/", response_model=Union[TransactionOut, Error])
def get_transaction(
    transaction_id: int,
    repo: TransactionRepository = Depends()
):
    return repo.get_transaction(transaction_id)


@router.get("/api/budgets/{budget_id}/transactions/", response_model=Union[List[TransactionInfoOut], Error])
def get_budget_transactions(
    budget_id: int,
    repo: TransactionRepository = Depends()
):
    return repo.get_budget_transactions(budget_id)


@router.put("/api/transactions/{transaction_id}/", response_model=Union[TransactionOut, Error])
def update_transaction(
    transaction_id: int,
    transaction: UpdateTransactionIn,
    repo: TransactionRepository = Depends()
):
    return repo.update(transaction, transaction_id)


@router.delete("api/transactions/{transaction_id}/", response_model=Union[bool, Error])
def delete_transaction(
    transaction_id: int,
    repo: TransactionRepository = Depends()
):
    return repo.delete(transaction_id)
