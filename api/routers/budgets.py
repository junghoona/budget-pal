from typing import List, Union
from fastapi import (
    APIRouter,
    Depends,
    Response
)
from queries.budgets import (
    BankOut,
    BudgetIn,
    BudgetOut,
    UpdateBudgetIn,
    BudgetRepository,
    Error
)


router = APIRouter()


@router.post("/api/budgets/", response_model=Union[BudgetOut, Error])
def create_budget(
    budget: BudgetIn,
    response: Response,
    repo: BudgetRepository = Depends()
):
    result = repo.create(budget)
    if result is None:
        response.status_code = 404
    return result


@router.get("/api/budgets/", response_model=Union[List[BudgetOut], Error])
def get_all(
    repo: BudgetRepository = Depends()
):
    return repo.get_all()


@router.get("/api/budgets/{budget_id}/", response_model=Union[BudgetOut, Error])
def get_budget(
    budget_id: int,
    response: Response,
    repo: BudgetRepository = Depends()
):
    result = repo.get(budget_id)
    if result is None:
        response.status_code = 404
    return result


@router.get("/api/banks/", response_model=Union[List[BankOut], Error])
def get_banks(
    response: Response,
    repo: BudgetRepository = Depends()
):
    result = repo.get_banks()
    if result is None:
        response.status_code = 404
    return result


@router.get("/api/banks/{bank}/budgets/", response_model=Union[List[BudgetOut], Error])
def get_bank_budgets(
    bank: str,
    response: Response,
    repo: BudgetRepository = Depends()
):
    result = repo.get_budget_by_bank(bank)
    if result is None:
        response.status_code = 404
    return result


@router.put("/api/budgets/{budget_id}/", response_model=Union[BudgetOut, Error])
def update_budget(
    budget_id: int,
    budget: UpdateBudgetIn,
    repo: BudgetRepository = Depends()
):
    return repo.update(budget_id, budget)


@router.delete("/api/budgets/{budget_id}/", response_model=Union[bool, Error])
def delete_budget(
    budget_id: int,
    repo: BudgetRepository = Depends()
):
    return repo.delete(budget_id)
