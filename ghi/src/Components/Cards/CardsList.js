import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "../Navbar";
import { 
    Searchbar,
    FilterDropdown,
    CardComponent
} from "../index";
import styles, { layout } from "../../style";
import React, { useEffect, useState } from 'react';

function CardsList() {
    const [cards, setCards] = useState([]);
    const [banks, setBanks] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [bank, setBank] = useState('Bank');
    const [category, setCategory] = useState('Category');
    const [bankDropdown, setBankDropdown] = useState(false);
    const [categoryDropdown, setCategoryDropdown] = useState(false);

    const fetchData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/cards/`
        );
        if (response.ok) {
            const data = await response.json();
            setCards(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    const fetchBanks = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/banks/`
        );
        if (response.ok) {
            const data = await response.json();
            setBanks(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    const fetchBudgets = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/budgets/`
        );
        if (response.ok) {
            const data = await response.json();
            setBudgets(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    }

    const handleBankChange = (e) => {
        const value = e.target.value;
        setBank(value);
    }

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
    }

    const filteredCards = cards.filter(card => card.bank === bank);

    const filteredBudgets = budgets.filter(budget => budget.category === category);

    const budgetFilteredCards = filteredBudgets.flatMap((budget) => {
        cards.filter(card => {
            return card.id === budget.card_id 
            })
        }
    );

    console.log('FILTERED CARDS: ', budgetFilteredCards);


    useEffect(() => {
        AOS.init();
        fetchData();
        fetchBanks();
        fetchBudgets();
    }, []);

    return (
        <div className="bg-teal-600 w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className={`bg-teal-600 ${styles.flexStart}`}>
                <div className={`${styles.boxWidth} mt-10 mb-10`}>
                    <Searchbar />
                </div>
            </div>
            <div className={`bg-teal-600 ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <section id="cards" className={`flex
                    md:flex-row flex-col ${styles.paddingY}`}>
                        <div className={`flex-1 ${styles.flexStart}
                        flex-col xl:px-0 sm:px-16 px-6`}>
                            <h1 className="flex-1 font-poppins
                            font-semibold ss:text-[72px] text-[52px]
                            text-white ss:leading-[100px]
                            leading-[75px] mb-5">
                                {cards.id} Cards
                            </h1>
                        </div>
                        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}> 
                            <div className="flex space-x-10">
                                {/* <FilterDropdown name="Bank" list={cards} /> */}
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
                                        tabIndex="-1"
                                    >
                                        <div 
                                            className="py-1"
                                            onChange={handleBankChange}
                                            onClick={() => setBankDropdown((prev) => !prev)}
                                            role="none"
                                            value={bank}
                                        >
                                            <option
                                                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                                                onClick={(e) => setBank(e.target.value)}
                                                role="menuitem"
                                                tabIndex="-1"
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
                                                        tabIndex="-1"
                                                        value={bank.bank}
                                                    >
                                                        {bank.bank}
                                                    </option>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {/* <FilterDropdown name="By Budget" /> */}
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
                                        tabIndex="-1"
                                    >
                                        <div 
                                            className="py-1"
                                            onChange={handleCategoryChange}
                                            onClick={() => setCategoryDropdown((prev) => !prev)}
                                            role="none"
                                            value={category}
                                        >
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
                            flex-row space-x-40`}>
                                {bank !== 'Bank' ? (
                                    filteredCards.map((card, index) => (
                                        <CardComponent key={card.id} {...
                                            card} index={index} />
                                        ))
                                    ) : (
                                        cards.map((card, index) => (
                                            <CardComponent key={card.id} {...
                                                card} index={index} />
                                        ))
                                    )}
                                {category !== 'Category' ? (
                                    budgetFilteredCards.map((card, index) => (
                                        <CardComponent key={card.id} {...card} index={index} />
                                    ))
                                ) : (
                                    cards.map((card, index) => (
                                        <CardComponent key={card.id} {...
                                            card} index={index} />
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div> 
                <div className='absolute z-[0] w-[30%] h-[80%] rounded-full bottom-40 white__gradient' />
            </div>
        </div>
    );
};

export default CardsList;