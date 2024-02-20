import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    Navbar,
    BudgetCard
} from "../index";
import styles, { layout } from '../../style';
import React, { useEffect, useState } from 'react';

function BudgetList() {
    const [banks, setBanks] = useState([]);
    const [bank, setBank] = useState('Bank');
    const [budgets, setBudgets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('Category');
    const [bankDropdown, setBankDropdown] = useState(false);
    const [categoryDropdown, setCategoryDropdown] = useState(false);
    const [filteredBudgets, setFilteredBudgets] = useState(budgets);

    const fetchData = async () => {
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

    const fetchBanks = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/banks/`, {
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
            setBanks(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    const handleBankChange = (e) => {
        const value = e.target.value;
        setBank(value);
    }

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filteredItems = budgets.filter(budget =>
            budget.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBudgets(filteredItems);
    }

    const handleSearchButton = () => {
        const search = budgets.filter(budget =>
            budget.name === searchTerm
        );
        setFilteredBudgets(search);
    }

    useEffect(() => {
        AOS.init();
        fetchData();
        fetchBanks();
    }, []);

    return (
        <div className="bg-teal-800 w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className={`bg-teal-800 ${styles.flexStart}`}>
                <div className={`${styles.boxWidth} mt-10 mb-10`}>
                    <label 
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900
                        sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex
                        items-center ps-3 pointer-events-none">
                            <svg 
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm
                            text-gray-900 border border-gray-300
                            rounded-lg bg-gray-50 focus:ring-blue-500
                            focus:border-blue-500"
                            placeholder="Enter search ..."
                            required
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <button
                            className="text-white absolute end-2.5 bottom-2.5
                            bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:outline-none focus:ring-blue-300
                            font-medium rounded-lg text-sm px-4 py-2"
                            onClick={handleSearchButton}
                            type="button"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className={`bg-teal-800 ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <section id="budgets" className={`flex 
                    md:flex-row flex-col ${styles.paddingY}`}>
                        <div className={`flex-1 ${styles.flexStart}
                        flex-col xl:px-0 sm:px-16 px-6`}>
                            <h1 className="flex-1 font-poppins
                            font-semibold ss:text-[72px] text-[52px]
                            text-white ss:leading-[100px]
                            leading-[75px] mb-5">
                                {budgets.length} Budgets
                            </h1>
                        </div>
                        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
                            <div className="flex space-x-10">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button 
                                            type="button"
                                            className="inline-flex w-full justify-center gap-x-1.5
                                            bg-white px-8 py-2 text-sm font-semibold text-gray-400
                                            shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50
                                            transition-all duration-150 ease-in-out"
                                            id="menu-button"
                                            aria-expanded="true"
                                            aria-haspopup="true"
                                            onClick={() => setBankDropdown((prev) => !prev)}
                                        >
                                            {bank}
                                        <svg
                                            className="-mr-1 h-5 w-5 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10
                                                11.168l3.71-3.938a.75.75 0 111.08
                                                1.04l-4.25 4.5a.75.75 0 01-1.08
                                                0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd" 
                                            />
                                        </svg>
                                        </button>
                                    </div>
                                    <div
                                        className={`${bankDropdown ? 'absolute' : 
                                        'hidden'} right-0 z-10 mt-2 w-40 origin-top-right
                                        divide-y divide-gray-100 rounded-md bg-white shadow-lg
                                        ring-1 ring-black ring-opacity-5 focus:outline-none`}
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="menu-button"
                                    >
                                        <div
                                            className="py-1"
                                            onChange={handleBankChange}
                                            onClick={() => setBankDropdown((prev) => !prev)}
                                        >
                                            <option
                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                onClick={(e) => setBank(e.target.value)}
                                                role="menuitem"
                                                value="Bank"
                                            >
                                                All Banks
                                            </option>
                                            {banks.map((bank) => {
                                                return (
                                                    <option
                                                        key={bank.bank}
                                                        className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                        onClick={(e) => setBank(e.target.value)}
                                                        role="menuitem"
                                                        value={bank.bank}
                                                    >
                                                        {bank.bank}
                                                    </option>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button 
                                            type="button"
                                            className="inline-flex w-full justify-center gap-x-1.5
                                            bg-white px-8 py-2 text-sm font-semibold text-gray-400
                                            shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50
                                            transition-all duration-150 ease-in-out"
                                            id="menu-button"
                                            aria-expanded="true"
                                            aria-haspopup="true"
                                            onClick={() => setCategoryDropdown((prev) => !prev)}
                                        >
                                            {category}
                                        <svg
                                            className="-mr-1 h-5 w-5 text-gray-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10
                                                11.168l3.71-3.938a.75.75 0 111.08
                                                1.04l-4.25 4.5a.75.75 0 01-1.08
                                                0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd" 
                                            />
                                        </svg>
                                        </button>
                                    </div>
                                    <div
                                        className={`${categoryDropdown ? 'absolute' : 
                                        'hidden'} right-0 z-10 mt-2 w-40 origin-top-right
                                        divide-y divide-gray-100 rounded-md bg-white shadow-lg
                                        ring-1 ring-black ring-opacity-5 focus:outline-none`}
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="menu-button"
                                    >
                                        <div
                                            className="py-1"
                                            onChange={handleCategoryChange}
                                            onClick={() => setCategoryDropdown((prev) => !prev)}
                                        >
                                            <option
                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                onClick={(e) => setCategory(e.target.value)}
                                                role="menuitem"
                                                value={`Category`}
                                            >
                                                All Categories
                                            </option>
                                            <option
                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                onClick={(e) => setCategory(e.target.value)}
                                                role="menuitem"
                                                tabIndex="-1"
                                                value="Shopping"
                                            >
                                                Shopping
                                            </option>
                                            <option
                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                onClick={(e) => setCategory(e.target.value)}
                                                role="menuitem"
                                                tabIndex="-1"
                                                value="Personal Care"
                                            >
                                                Personal Care
                                            </option>
                                            <option
                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                onClick={(e) => setCategory(e.target.value)}
                                                role="menuitem"
                                                tabIndex="-1"
                                                value="Auto & Transport"
                                            >
                                                Auto & Transport
                                            </option>
                                            <option
                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                onClick={(e) => setCategory(e.target.value)}
                                                role="menuitem"
                                                tabIndex="-1"
                                                value="Bills & Utilities"
                                            >
                                                Bills & Utilities
                                            </option>
                                            <option
                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                onClick={(e) => setCategory(e.target.value)}
                                                role="menuitem"
                                                tabIndex="-1"
                                                value="Dining & Drinks"
                                            >
                                                Dining & Drinks
                                            </option>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="features"
                        className={layout.section}
                        data-aos="fade-up"
                        data-aos-duration="1500"
                    >
                        <div className={layout.sectionInfo}>
                            <div className={`${layout.sectionImg}
                            flex-row space-x-20`}>
                                {searchTerm && filteredBudgets.length === 0
                                ? <p>No Users Found</p>
                                : (!searchTerm && filteredBudgets.length === 0)
                                ? (budgets.map((budget, index) => (
                                    <BudgetCard key={budget.id} {...
                                        budget} index={index} />
                                        )
                                    )
                                ) : (category !== "Category" && bank !== "Bank")
                                ? (filteredBudgets.filter((budget) => (
                                        budget.bank === bank && budget.category === category)
                                    ).map((budget, index) => (
                                    <BudgetCard key={budget.id} {...
                                        budget} index={index} />
                                        )
                                    )
                                ) : (category !== "Category")
                                ? (filteredBudgets.filter((budget) => (
                                        budget.category === category)
                                    ).map((budget, index) => (
                                    <BudgetCard key={budget.id} {...
                                        budget} index={index} />
                                        )
                                    )
                                ) : (bank !== "Bank")
                                ? (filteredBudgets.filter((budget) => (
                                        budget.bank === bank)
                                    ).map((budget, index) => (
                                    <BudgetCard key={budget.id} {...
                                        budget} index={index} />
                                        )
                                    )
                                ) : (filteredBudgets.map((budget, index) => (
                                        <BudgetCard key={budget.id} {...
                                            budget} index={index} />
                                            )
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div> 
                <div className='absolute z-[0] w-[10%] h-[80%] rounded-full bottom-40 white__gradient' />
            </div>
        </div>
    );
};

export default BudgetList;