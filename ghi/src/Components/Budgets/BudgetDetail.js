import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Navbar,
    TransactionTable
} from "../index";
import styles from "../../style";

function BudgetDetail() {
    const [transactions, setTransactions] = useState([]);
    const [budget, setBudget] = useState({});
    const { budget_id } = useParams();

    const fetchData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/budgets/${budget_id}/`, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log("DATA: ", data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    const fetchTransactions = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/budgets/${budget_id}/transactions/`, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            setTransactions(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    useEffect(() => {
        fetchData();
        fetchTransactions();
    }, [budget_id]);

    return (
        <div className="bg-teal-800 w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className="sm:px-6 w-full">
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="mt-7 overflow-x-auto">
                        <table className="w-full table-auto whitespace-nowrap">
                            <thead>
                                <tr className="w-full bg-teal-500 
                                border border-gray-200 rounded">
                                    <th className="font-poppins font-semibold 
                                    text-sm text-white ">Description</th>
                                    <th className="font-poppins font-semibold 
                                    text-sm text-white ">Budget</th>
                                    <th className="font-poppins font-semibold 
                                    text-sm text-white ">Date</th>
                                    <th className="font-poppins font-semibold 
                                    text-sm text-white ">Price</th>
                                </tr>
                            </thead>
                            {transactions.map(transaction => (
                                <TransactionTable {...transaction} />
                                )
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetDetail;