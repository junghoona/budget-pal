from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from typing import List, Union
import os


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class Error(BaseModel):
    message: str


# Input Model
class BudgetIn(BaseModel):
    name: str
    category: str
    amount: int
    card_id: int


# Output Model
class BudgetOut(BaseModel):
    id: int
    name: str
    category: str
    amount: int
    card_id: int


# Update Input Model
class UpdateBudgetIn(BaseModel):
    name: str
    category: str
    amount: int


class BudgetRepository:
    def create(self, budget: BudgetIn) -> Union[BudgetOut, Error]:
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
                        [budget.card_id]
                    )
                    card = db.fetchone()[0]
                    if not card:
                        return {"message": "Invalid card ID. Card does not exist in database"}
                    result = db.execute(
                        """
                        INSERT INTO budgets (
                            name
                          , category
                          , amount
                          , card_id
                        )
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            budget.name,
                            budget.category,
                            budget.amount,
                            budget.card_id
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
                            name=record[1],
                            category=record[2],
                            amount=record[3],
                            card_id=record[4]
                        )
                        result.append(budget)
                    return result
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Could not get all budgets"}

    def get_card(self, card_id: int) -> Union[List[BudgetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT budgets.id
                             , budgets.name
                             , budgets.category
                             , budgets.amount
                             , budgets.card_id
                        FROM budgets
                        JOIN cards ON (budgets.card_id = cards.id)
                        WHERE budgets.card_id = %s
                        """,
                        [card_id]
                    )
                    results = []
                    for row in db.fetchall():
                        record = {}
                        for i, column in enumerate(db.description):
                            record[column.name] = row[i]
                        results.append(BudgetOut(**record))
                    return results
        except Exception as e:
            print("ERROR: ", e)
            return {"message": "Invalid card ID. Could not get card."}

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
