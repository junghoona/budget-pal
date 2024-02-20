import { Link } from "react-router-dom";
import card from "../../Assets/card.png";
import { Button } from "../index";
import React from "react";

function BudgetCard({
    id, bank, name, category, amount 
}) {
    return (
        <div className="w-80 max-w-sm bg-white border border-gray-200
            rounded-lg shadow-lg dark:border-teal-950"
        >
            <img 
                className="w-full"
                src={card}
                alt="card image" 
            />
            <div className="flex flex-col items-center px-5 pb-5">
                <h5 className="mt-2 mb-2 text-3xl font-semibold
                    text-teal-900 dark:text-white"
                >
                    {name}
                </h5>
                <p className="text-gray-700 text-base">
                    {bank}
                </p>
            </div>
            <div className="flex justify-center mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs 
                font-semibold py-0.5 rounded ms-3">
                    #{category}
                </span>

            </div>
            <div className="flex items-center justify-between px-2">
                <p className="font-poppins">Amount: </p> 
                <span className="px-1.5 text-xl font-bold 
                    text-gray-900 dark:text-white"
                >
                    ${amount}.00
                </span>
                <Link 
                    className="nav-link"
                    to={`${process.env.PUBLIC_URL}/budgets/${id}`}
                    role="button"
                >
                    <Button content='View Details' />
                </Link>
            </div>
        </div>
    );
};

export default BudgetCard;
