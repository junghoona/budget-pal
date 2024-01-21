from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from datetime import datetime
from typing import (
    List,
    Optional,
    Union
)
import os


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


# Input Model
class TransactionIn(BaseModel):
    date: Optional[datetime]
    price: int
    description: str
    card_id: int
    budget_id: int


class UpdateTransactionIn(BaseModel):
    date: Optional[datetime]
    price: int
    description: str


# Output Model
class TransactionOut(BaseModel):
    id: int
    date: Optional[datetime]
    price: int
    description: str
    bank: str
    budget: str


# Output Model
class TransactionInfoOut(BaseModel):
    id: int
    date: Optional[datetime]
    price: int
    description: str


class TransactionRepository:
    def create(
        self,
        transaction: TransactionIn
    ) -> Union[TransactionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT EXISTS (
                            SELECT * FROM cards
                            WHERE id = %s
                        )
                        """,
                        [transaction.card_id]
                    )
                    card = db.fetchone()[0]
                    if not card:
                        return {"message": "Invalid card ID. Card does not exist in database"}
                    db.execute(
                        """
                        SELECT EXISTS (
                            SELECT * FROM budgets
                            WHERE id = %s
                        )
                        """,
                        [transaction.budget_id]
                    )
                    budget = db.fetchone()[0]
                    if not budget:
                        return {"message": "Invalid budget ID. Budget does not exist in database"}
                    # TODO: Add SQL Query logic to check if card ID contains budget ID
                    result = db.execute(
                        """
                        INSERT INTO transactions (
                            date
                          , price
                          , description
                          , card_id
                          , budget_id
                        )
                        VALUES (
                            %s, %s, %s, %s, %s
                        )
                        RETURNING id
                        """,
                        [
                            transaction.date,
                            transaction.price,
                            transaction.description,
                            transaction.card_id,
                            transaction.budget_id
                        ]
                    )
                    id = result.fetchone()[0]

                    db.execute(
                        """
                        SELECT transactions.date
                             , transactions.price
                             , transactions.description
                             , cards.bank
                             , budgets.name
                        FROM transactions
                        JOIN budgets ON (transactions.budget_id = budgets.id)
                        JOIN cards ON (budgets.card_id = cards.id)
                        WHERE transactions.id = %s
                        """,
                        [id]
                    )
                    record = db.fetchone()
                    return TransactionOut(
                        id=id,
                        date=record[0],
                        price=record[1],
                        description=record[2],
                        bank=record[3],
                        budget=record[4]
                    )
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not create transaction"}

    def get_all(self) -> Union[List[TransactionInfoOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM transactions
                        ORDER BY date ASC;
                        """
                    )
                    result = []
                    for record in db:
                        transaction = TransactionInfoOut(
                            id=record[0],
                            date=record[1],
                            price=record[2],
                            description=record[3]
                        )
                        result.append(transaction)
                    return result
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not get all transactions"}

    def get_transaction(
        self,
        transaction_id: int
    ) -> Union[TransactionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT transactions.id
                             , transactions.date
                             , transactions.price
                             , transactions.description
                             , cards.bank
                             , budgets.name
                        FROM transactions
                        JOIN budgets ON (transactions.budget_id = budgets.id)
                        JOIN cards ON (transactions.card_id = cards.id)
                        WHERE transactions.id = %s
                        """,
                        [transaction_id]
                    )
                    record = db.fetchone()
                    return TransactionOut(
                        id=transaction_id,
                        date=record[1],
                        price=record[2],
                        description=record[3],
                        bank=record[4],
                        budget=record[5]
                    )
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Invalid Transaction ID. Transaction does not exist in database"}

    def get_card_transactions(
        self,
        card_id: int
    ) -> Union[List[TransactionInfoOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT EXISTS (
                            SELECT * FROM cards
                            WHERE id = %s
                        )
                        """,
                        [card_id]
                    )
                    card = db.fetchone()[0]
                    if not card:
                        return {"message": "Invalid card ID. Card does not exist in database"}

                    db.execute(
                        """
                        SELECT transactions.id
                             , transactions.date
                             , transactions.price
                             , transactions.description
                        FROM transactions
                        WHERE transactions.card_id = %s
                        """,
                        [card_id]
                    )
                    result = []
                    for record in db:
                        transaction = TransactionInfoOut(
                            id=record[0],
                            date=record[1],
                            price=record[2],
                            description=record[3]
                        )
                        result.append(transaction)
                    return result
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not get transactions"}

    def get_budget_transactions(
        self,
        card_id: int,
        budget_id: int
    ) -> Union[List[TransactionInfoOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT EXISTS (
                            SELECT * FROM cards
                            WHERE id = %s
                        )
                        """,
                        [card_id]
                    )
                    card = db.fetchone()[0]
                    if not card:
                        return {"message": "Invalid card ID. Card does not exist in database"}

                    db.execute(
                        """
                        SELECT EXISTS (
                            SELECT * FROM budgets
                            WHERE id = %s
                        )
                        """,
                        [budget_id]
                    )
                    budget = db.fetchone()[0]
                    if not budget:
                        return {"message": "Invalid budget ID. Budget does not exist in database"}

                    db.execute(
                        """
                        SELECT transactions.id
                             , transactions.date
                             , transactions.price
                             , transactions.description
                        FROM transactions
                        WHERE transactions.card_id = %s AND transactions.budget_id = %s
                        """,
                        [card_id, budget_id]
                    )
                    result = []
                    for record in db:
                        transaction = TransactionInfoOut(
                            id=record[0],
                            date=record[1],
                            price=record[2],
                            description=record[3]
                        )
                        result.append(transaction)
                    return result
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not get transactions"}

    def update(
        self,
        transaction: UpdateTransactionIn,
        transaction_id: int
    ) -> Union[TransactionOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE transactions
                        SET date = %s
                          , price = %s
                          , description = %s
                        WHERE id = %s
                        """,
                        [
                            transaction.date,
                            transaction.price,
                            transaction.description,
                            transaction_id
                        ]
                    )
                    result = db.execute(
                        """
                        SELECT transactions.id
                             , transactions.date
                             , transactions.price
                             , transactions.description
                             , budgets.name
                             , cards.bank
                        FROM transactions
                        JOIN budgets ON (transactions.budget_id = budgets.id)
                        JOIN cards ON (budgets.card_id = cards.id)
                        WHERE transactions.id = %s
                        """,
                        [transaction_id]
                    )
                    record = result.fetchone()
                    id = record[0]
                    if id is None:
                        raise ValueError("This transaction ID does not exist")
                    return TransactionOut(
                        id=id,
                        date=record[1],
                        price=record[2],
                        description=record[3],
                        budget=record[4],
                        bank=record[5]
                    )
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not update transaction"}

    def delete(
        self,
        transaction_id: id
    ) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM transactions
                        WHERE id = %s
                        """,
                        [transaction_id]
                    )
                    # TODO: Add SQL Query logic to check if entry deleted successfully
                    return True
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not delete transaction"}
