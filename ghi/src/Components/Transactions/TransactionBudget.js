import React, { useState, useEffect } from "react";

function TransactionBudget({ id }) {
    const [category, setCategory] = useState('');
    const [budget, setBudget] = useState('');
    const fetchData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/transactions/${id}/`
        );
        if (response.ok) {
            const data = await response.json();
            setCategory(data.category);
            setBudget(data.budget);
        } else {
            console.error(`ERROR: ${response}`);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id])
    return (
        <div>
            <span className="bg-red-100 text-red-800 text-xs 
            font-semibold py-1 rounded ms-3">
                {budget}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs 
            font-semibold py-1 rounded ms-3">
                {category}
            </span>
        </div>
    );
};

export default TransactionBudget;