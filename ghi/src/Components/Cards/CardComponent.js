import card from "../../Assets/card.png";
import React, { useState, useEffect } from 'react';

function CardComponent({ 
    id, bank, name, current_balance, minimum_payment, credit_limit
}) {
    const [budgets, setBudgets] = useState([]);

    const fetchData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/cards/${id}/budgets/`
        );
        if (response.ok) {
            const data = await response.json();
            setBudgets(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

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
                <h5 className="mt-2 text-3xl font-semibold
                    text-teal-900 dark:text-white"
                >
                    {bank}
                </h5>
                <p className="text-gray-700 text-base">
                    {name}
                </p>
            </div>
            <div className="flex justify-center mt-2.5 mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs 
                font-semibold py-0.5 rounded ms-3">
                    Credit Limit: $ {credit_limit}.00
                </span>
                <span className="bg-red-100 text-red-800 text-xs 
                font-semibold px-1 py-0.5 rounded ms-3">
                    Payment Due: $ {minimum_payment}.00
                </span>
            </div>
            <div className="flex justify-center mt-2.5 mb-5">
                {budgets.map((budget) => (
                    <span className="inline-block bg-gray-200 rounded-full
                    px-3 py-1 text-sm text-gray-700 
                    font-semibold py-0.5 rounded ms-3">
                        #{budget.name}
                    </span>
                ))}
            </div>
            <div className="flex items-center justify-between px-2">
                <p className="font-poppins">Balance: </p> 
                <span className="px-1.5 text-xl font-bold 
                    text-gray-900 dark:text-white"
                >
                    ${current_balance}.00
                </span>
                <a 
                    href="#"
                    className="text-white bg-blue-700 hover:bg-blue-800
                    focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    View Details
                </a>
            </div>
        </div>
    );
};

export default CardComponent;