from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from typing import List, Union
import os


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


# Input Model
class BudgetIn(BaseModel):
    bank: str
    card: str
    name: str
    category: str
    amount: int


# Output Model
class BudgetOut(BaseModel):
    id: int
    bank: str
    card: str
    name: str
    category: str
    amount: int


# Update Input Model
class UpdateBudgetIn(BaseModel):
    name: str
    category: str
    amount: int


class BankOut(BaseModel):
    bank: str


class BudgetRepository:
    def create(self, budget: BudgetIn) -> Union[BudgetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO budgets (
                            bank
                          , card
                          , name
                          , category
                          , amount
                        )
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            budget.bank,
                            budget.card,
                            budget.name,
                            budget.category,
                            budget.amount
                        ]
                    )
                    id = result.fetchone()[0]
                    data = budget.dict()
                    return BudgetOut(
                        id=id, **data
                    )
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not create a budget"}

    def get_all(self) -> Union[List[BudgetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM budgets
                        ORDER BY category ASC;
                        """
                    )
                    result = []
                    for record in db:
                        budget = BudgetOut(
                            id=record[0],
                            bank=record[1],
                            card=record[2],
                            name=record[3],
                            category=record[4],
                            amount=record[5]
                        )
                        result.append(budget)
                    return result
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not get all budgets"}

    def get(self, budget_id: int) -> Union[BudgetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , bank
                             , card
                             , name
                             , category
                             , amount
                        FROM budgets
                        WHERE id = %s;
                        """,
                        [budget_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return {"message": "Invalid ID: Budget does not exist"}
                    return BudgetOut(
                        id=record[0],
                        bank=record[1],
                        card=record[2],
                        name=record[3],
                        category=record[4],
                        amount=record[5]
                    )
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Invalid card ID. Could not get card."}

    def get_banks(self) -> Union[List[BankOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT DISTINCT bank
                        FROM budgets
                        ORDER BY bank ASC;
                        """
                    )
                    result = []
                    for record in db:
                        bank = BankOut(
                            bank=record[0]
                        )
                        result.append(bank)
                    return result
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Invalid Query. Could not select banks from database."}

    def get_budget_by_bank(self, bank: str) -> Union[List[BudgetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM budgets
                        WHERE bank = %s
                        ORDER BY name ASC;
                        """,
                        [bank]
                    )
                    result = []
                    for record in db:
                        budget = BudgetOut(
                            id=record[0],
                            bank=record[1],
                            card=record[2],
                            name=record[3],
                            category=record[4],
                            amount=record[5]
                        )
                        result.append(budget)
                    return result
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Invalid Bank. Bank does not exist"}

    def update(self, budget_id: int, budget: UpdateBudgetIn) -> Union[BudgetOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE budgets
                        SET name = %s
                          , category = %s
                          , amount = %s
                        WHERE id = %s;
                        """,
                        [
                            budget.name,
                            budget.category,
                            budget.amount,
                            budget_id
                        ]
                    )
                    db.execute(
                        """
                        SELECT * FROM budgets
                        WHERE id = %s;
                        """,
                        [budget_id]
                    )
                    result = db.fetchone()
                    id, card_id = result[0], result[-1]
                    data = budget.dict()

                    if id is None:
                        raise ValueError("Budget does not exist")
                    return BudgetOut(
                        id=id, **data, card_id=card_id
                    )
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not update budget information"}

    def delete(self, budget_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM budgets
                        WHERE id = %s;
                        """,
                        [budget_id]
                    )
                    return True
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not delete budget"}
