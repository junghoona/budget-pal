from psycopg_pool import ConnectionPool
from typing import List, Union
from pydantic import BaseModel
from datetime import datetime
import os


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


# Input model
class CardIn(BaseModel):
    bank: str
    name: str
    current_balance: int
    minimum_payment: int
    credit_limit: int
    card_number: str
    expiration_date: str
    security_cvc: int


# Output model (include id)
class CardOut(BaseModel):
    id: int
    bank: str
    name: str
    current_balance: int
    minimum_payment: int
    credit_limit: int
    card_number: str
    expiration_date: datetime
    security_cvc: int


# Repository model - Query DB
class CardRepository:
    def create(self, card: CardIn) -> Union[CardOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO cards (
                        bank
                      , name
                      , current_balance
                      , minimum_payment
                      , credit_limit
                      , card_number
                      , expiration_date
                      , security_cvc
                    )
                    VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s
                    )
                    RETURNING id
                            , bank
                            , name
                            , current_balance
                            , minimum_payment
                            , credit_limit
                            , card_number
                            , expiration_date
                            , security_cvc;
                    """,
                    [
                        card.bank,
                        card.name,
                        card.current_balance,
                        card.minimum_payment,
                        card.credit_limit,
                        card.card_number,
                        card.expiration_date,
                        card.security_cvc
                    ]
                )
                id = result.fetchone()[0]
                data = card.dict()
                return CardOut(id=id, **data)

    def get_all(self) -> Union[List[CardOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM cards
                        ORDER BY bank ASC;
                        """
                    )
                    result = []
                    for record in db:
                        card = CardOut(
                            id=record[0],
                            bank=record[1],
                            name=record[2],
                            current_balance=record[3],
                            minimum_payment=record[4],
                            credit_limit=record[5],
                            card_number=record[6],
                            expiration_date=record[7],
                            security_cvc=record[8]
                        )
                        result.append(card)
                    return result
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could Not Get All Cards. Add a New Card"}

    def get_bank(self, bank_name: str) -> Union[List[CardOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM cards
                        WHERE bank = %s
                        ORDER BY name ASC;
                        """,
                        [bank_name]
                    )
                    result = []
                    for record in db:
                        card = CardOut(
                            id=record[0],
                            bank=bank_name,
                            name=record[2],
                            current_balance=record[3],
                            minimum_payment=record[4],
                            credit_limit=record[5],
                            card_number=record[6],
                            expiration_date=record[7],
                            security_cvc=record[8]
                        )
                        result.append(card)
                    return result

        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Invalid Bank Name. Bank Name Does Not Exist."}

    def get(self, card_id: int) -> Union[CardOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , bank
                             , name
                             , current_balance
                             , minimum_payment
                             , credit_limit
                             , card_number
                             , expiration_date
                             , security_cvc
                        FROM cards
                        WHERE id = %s;
                        """,
                        [card_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return {"message": "Invalid Id: Card does not exist"}
                    return CardOut(
                        id=card_id,
                        bank=record[1],
                        name=record[2],
                        current_balance=record[3],
                        minimum_payment=record[4],
                        credit_limit=record[5],
                        card_number=record[6],
                        expiration_date=record[7],
                        security_cvc=record[8]
                    )
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Invalid Card id: Card does not exist"}

    def update(self, card_id: id, card: CardIn) -> CardOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE cards
                        SET bank = %s
                          , name = %s
                          , current_balance = %s
                          , minimum_payment = %s
                          , credit_limit = %s
                          , card_number = %s
                          , expiration_date = %s
                          , security_cvc = %s
                        WHERE id = %s;
                        """,
                        [
                            card.bank,
                            card.name,
                            card.current_balance,
                            card.minimum_payment,
                            card.credit_limit,
                            card.card_number,
                            card.expiration_date,
                            card.security_cvc,
                            card_id
                        ]
                    )
                    result = db.execute(
                        """
                        SELECT * FROM cards
                        WHERE id = %s;
                        """,
                        [card_id]
                    )
                    id = result.fetchone()[0]
                    data = card.dict()
                    if id is None:
                        raise ValueError("This card ID does not exist")
                    return CardOut(
                        id=id, **data
                    )
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not update card information"}

    def delete(self, card_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM cards
                        WHERE id = %s;
                        """,
                        [card_id]
                    )
                    return True
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not delete card"}
