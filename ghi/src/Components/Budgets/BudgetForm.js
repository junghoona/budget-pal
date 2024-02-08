import React, { useState, useEffect } from 'react';
import budget from '../../Assets/budget.png';
import styles from '../../style';


function BudgetForm({ close }) {
    const [bank, setBank] = useState('');
    const [card, setCard] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);

    const handleBankChange = (e) => {
        const value = e.target.value;
        setBank(value);
    };

    const handleCardChange = (e) => {
        const value = e.target.value;
        setCard(value);
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
    }
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            bank: bank,
            card: card,
            name: name,
            category: category,
            amount: amount
        };

        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/budgets`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            const newBudget = response.json();
            setBank('');
            setCard('');
            setName('');
            setCategory("");
            setAmount(0);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    return (
        <div className="min-h-screen py-6
        flex flex-col justify-center sm:py-10">
            <div className="relative
            py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-8
                bg-gradient-to-r from-lime-700 to-lime-400
                shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className={`${styles.heading}
                        flex justify-center mb-2`}
                    >
                        Add New Budget
                    </h1>
                    <img src={budget} alt='budget'
                    className="w-[48px] h-[48px] mb-4" />
                    <form 
                        className="bg-white w-full max-w-lg rounded-[20px]"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-bank"
                                >
                                    Bank
                                </label>
                                <input
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-budget-name"
                                    type="text"
                                    onChange={handleBankChange}
                                    placeholder="Enter Bank Name"
                                    value={bank} 
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-card-name"
                                >
                                    Card
                                </label>
                                <input
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-budget-name"
                                    type="text"
                                    onChange={handleCardChange}
                                    placeholder="Enter Card Name"
                                    value={card} 
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-6">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-name"
                                >
                                    Name
                                </label>
                                <input
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-budget-name"
                                    type="text"
                                    onChange={handleNameChange}
                                    placeholder="Enter Budget Name"
                                    value={name} 
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="category"
                                >
                                    Category
                                </label>
                                <select
                                    onChange={(e) => (setCategory(e.target.value))}
                                    required
                                    className="form-select block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:border-gray-500"
                                    id="category"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Personal Care">Personal Care</option>
                                    <option value="Auto & Transport">Auto & Transport</option>
                                    <option value="Bills & Utilities">Bills & Utilities</option>
                                    <option value="Dining & Drinks">Dining & Drinks</option>
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="amount"
                                >
                                    Amount
                                </label>
                                <input
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-budget-amount"
                                    onChange={handleAmountChange}
                                    value={amount} 
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
                                Add Budget
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

export default BudgetForm;