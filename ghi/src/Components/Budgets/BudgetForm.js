import React, { useState, useEffect } from 'react';
import budget from '../../Assets/budget.png';
import styles from '../../style';


function BudgetForm({ close }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState('');

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
    }

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
    }

    
    const fetchData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/cards`
        );
        if (response.ok) {
            const data = await response.json();
            setCards(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };
        
    useEffect(() => {
        fetchData();
    }, []);
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            category: category,
            amount: amount,
            card_id: card,
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
            setName('');
            setCategory('');
            setAmount(0);
            setCard('');
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
                        Add New Budget
                    </h1>
                    <img src={budget} alt='budget'
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
                                    htmlFor="card"
                                >
                                    Card
                                </label>
                                <select
                                    onChange={(e) => setCard(e.target.value)}
                                    required
                                    className="form-select block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200 rounded
                                    py-3 px-4 mb-3 focus:outline-none focus:border-gray-500"
                                >
                                    <option value="">Choose a Card</option>
                                    {cards.map((card) => {
                                        return (
                                            <option
                                                key={card.id}
                                                value={card.id}
                                            >
                                                {card.bank} {card.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="category"
                                >
                                    Category
                                </label>
                                <select
                                    onChange={handleCategoryChange}
                                    required
                                    className="form-select block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:border-gray-500"
                                    id="category"
                                >
                                    <option value="">Select Category</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="personal care">Personal Care</option>
                                    <option value="auto transport">Auto & Transport</option>
                                    <option value="utilities">Bills & Utilities</option>
                                    <option value="dining">Dining & Drinks</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-6">
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