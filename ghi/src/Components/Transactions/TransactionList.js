import Navbar from "../Navbar";
import {
    Button,
    categories,
    TransactionForm,
    TransactionTable
} from "../index";
import styles from "../../style";
import Popup from 'reactjs-popup';
import React, { useState, useEffect } from "react";


function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [category, setCategory] = useState("");

    const fetchTransactions = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/transactions/`, {
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

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);
    return (
        <div className="bg-teal-800 w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className="sm:px-6 w-full">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p className="focus:outline-none font-poppins 
                        ss:text-[72px] text-[52px] text-white 
                        font-semibold leading-normal">
                            Transactions
                        </p>
                        <div className="py-3 px-2 flex items-center text-sm font-medium 
                        leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 rounded">
                            <p>Sort By:</p>
                            <select className="focus:text-indigo-600 
                            focus:outline-none bg-transparent ml-1">
                                <option 
                                    className="text-sm text-indigo-800"
                                >
                                    Latest
                                </option>
                                <option 
                                    className="text-sm text-indigo-800"
                                >
                                    Oldest
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center">
                            <a className="rounded-full focus:outline-none 
                            focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800">
                                <div 
                                    className="py-2 px-8 text-gray-600 
                                    hover:text-indigo-700 hover:bg-indigo-100 
                                    rounded-full cursor-pointer"
                                    onChange={handleCategoryChange}
                                >
                                    <option
                                        onClick={(e) => setCategory(e.target.value)}
                                        value=""
                                    >
                                        All
                                    </option>
                                </div>
                            </a>
                            {categories.map((category) => {
                                return (
                                    <a 
                                        className="rounded-full focus:outline-none focus:ring-2 
                                        focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" 
                                    >
                                        <div 
                                            className="py-2 px-8 text-gray-600 
                                            hover:text-indigo-700 hover:bg-indigo-100 
                                            rounded-full cursor-pointer"
                                            onChange={handleCategoryChange}
                                        >
                                            <option 
                                                key={category.id}
                                                onClick={(e) => setCategory(e.target.value)}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                        <Popup
                            trigger={<button>
                                <Button styles='ml-10'
                                content='Add Transaction' /></button>
                            }
                            modal
                            nested
                        >
                            {(close) => (
                            <div>
                                <div>
                                    <TransactionForm close={close}/>
                                </div>
                            </div>
                            )}
                        </Popup>
                    </div>
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
                            {category ? (transactions.filter((transaction) => (
                                transaction.category === category)
                            ).map((transaction) => (
                                <TransactionTable {...transaction} />)
                            )) : (transactions.map((transaction) => (
                                <TransactionTable {...transaction} />)
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;

