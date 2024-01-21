from typing import List, Union
from fastapi import (
    APIRouter,
    Depends,
    Response
)
from queries.budgets import (
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
def get_budgets(
    repo: BudgetRepository = Depends()
):
    return repo.get_all()


@router.get("/api/cards/{card_id}/budgets/", response_model=Union[List[BudgetOut], Error])
def get_budgets_in_card(
    card_id: int,
    response: Response,
    repo: BudgetRepository = Depends()
):
    result = repo.get_card(card_id)
    if result is None or result == []:
        response.status_code = 404
        return {"message": "Invalid request - no budgets have been created for selected card"}
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
