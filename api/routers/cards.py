from typing import List, Union
from fastapi import (
    APIRouter,
    Depends,
    Response
)
from queries.cards import (
    Error,
    BankOut,
    CardIn,
    CardOut,
    CardRepository
)


router = APIRouter()


@router.post("/api/cards/", response_model=Union[CardOut, Error])
def create_card(
    card: CardIn,
    response: Response,
    repo: CardRepository = Depends()
):
    card = repo.create(card)
    if card is None:
        response.status_code = 404
    return card


@router.get("/api/cards/", response_model=Union[List[CardOut], Error])
def get_cards(
    repo: CardRepository = Depends()
):
    return repo.get_all()


@router.get("/api/banks/", response_model=Union[List[BankOut], Error])
def get_banks(
    repo: CardRepository = Depends()
):
    return repo.get_banks()


@router.get("/api/banks/{bank_name}/cards/", response_model=Union[List[CardOut], Error])
def get_cards_in_bank(
    bank_name: str,
    response: Response,
    repo: CardRepository = Depends()
):
    card = repo.get_bank(bank_name)
    if card is None:
        response.status_code = 404
    return card


@router.get("/api/cards/{card_id}/", response_model=Union[CardOut, Error])
def get_card_by_id(
    card_id: int,
    response: Response,
    repo: CardRepository = Depends()
):
    card = repo.get(card_id)
    if card is None:
        response.status_code = 404
    return card


@router.put("/api/cards/{card_id}/", response_model=Union[CardOut, Error])
def update_card(
    card_id: int,
    card: CardIn,
    repo: CardRepository = Depends()
):
    return repo.update(card_id, card)


@router.delete("/api/cards/{card_id}/", response_model=Union[bool, Error])
def delete_card(
    card_id: int,
    repo: CardRepository = Depends()
):
    return repo.delete(card_id)
