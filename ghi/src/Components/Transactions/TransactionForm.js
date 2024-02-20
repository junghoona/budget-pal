import styles from '../../style';
import React, { useEffect, useState } from 'react';
import transaction from "../../Assets/transaction.png";


function TransactionForm({ close }) {
    const [date, setDate] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [budgets, setBudgets] = useState([]);
    const [budget, setBudget] = useState('');

    const handleDateChange = (e) => {
        const value = e.target.value;
        setDate(value);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
    };

    const fetchBudgets = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/budgets/`, {
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
            setBudgets(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            date: date,
            price: price,
            description: description,
            budget_id: budget,
        };
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/transactions/`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            setDate('');
            setPrice(0);
            setDescription('');
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    return (
        <div className="min-h-screen py-6
        flex flex-col justify-center sm:py-12">
            <div className="relative
            py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-8
                bg-gradient-to-r from-lime-700 to-lime-400
                shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className={`${styles.heading}
                        flex justify-center mb-2`}
                    >
                        Add New Transaction
                    </h1>
                    <img src={transaction} alt='transaction'
                    className="w-[48px] h-[48px] mb-4" />
                    <form
                        className="bg-white w-full max-w-lg rounded-[20px]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-6">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-description"
                                >
                                    Description
                                </label>
                                <input
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-description"
                                    type="text"
                                    onChange={handleDescriptionChange}
                                    placeholder="Enter Transaction Description"
                                    value={description}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-6">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="budget"
                                >
                                    Budget
                                </label>
                                <select
                                    onChange={(e) => setBudget(e.target.value)}
                                    required
                                    className="form-select block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200 rounded
                                    py-3 px-4 mb-3 focus:outline-none focus:border-gray-500"
                                >
                                    <option value="">Select Budget</option>
                                    {budgets.map((budget) => {
                                        return (
                                            <option
                                                key={budget.id}
                                                value={budget.id}
                                            >
                                                {budget.name}
                                            </option>
                                        )
                                    })};
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-date"
                                >
                                    Date
                                </label>
                                <input
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border-gray-200
                                    rounded py-3 px-4 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-date"
                                    type="datetime-local"
                                    onChange={handleDateChange}
                                    value={date}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-price"
                                >
                                    Price
                                </label>
                                <input 
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-price"
                                    onChange={handlePriceChange}
                                    value={price}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <button 
                                className="bg-teal-500 hover:bg-teal-400 text-white 
                                font-bold mb-4 py-2 px-4 rounded focus:outline-none 
                                focus:shadow-outline" 
                                type="submit"
                            >
                                Add Transaction
                            </button>
                            <button 
                                className="bg-teal-500 hover:bg-teal-400 text-white 
                                font-bold mb-4 py-2 px-4 rounded focus:outline-none 
                                focus:shadow-outline" 
                                onClick={() => close()}
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;