import React, { useState } from 'react';
import payment from '../../Assets/payment.png';
import styles from '../../style';

function CardForm({ close }) {
    const [bank, setBank] = useState('');
    const [cardName, setCardName] = useState('');
    const [balance, setBalance] = useState(0);
    const [minPayment, setMinPayment] = useState(0);
    const [creditLimit, setCreditLimit] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCVC] = useState(0);

    const handleBankChange = (e) => {
        const value = e.target.value;
        setBank(value);
    };

    const handleCardNameChange = (e) => {
        const value = e.target.value;
        setCardName(value);
    };

    const handleBalanceChange = (e) => {
        const value = e.target.value;
        setBalance(value);
    };

    const handleMinPaymentChange = (e) => {
        const value = e.target.value;
        setMinPayment(value);
    };

    const handleCreditLimitChange = (e) => {
        const value = e.target.value;
        setCreditLimit(value);
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
    };

    const handleExpirationDateChange = (e) => {
        const value = e.target.value;
        setExpirationDate(value);
    };

    const handleCVCChange = (e) => {
        const value = e.target.value;
        setCVC(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // additional logic here...
        const data = {
            bank: bank,
            name: cardName,
            current_balance: balance,
            minimum_payment: minPayment,
            credit_limit: creditLimit,
            card_number: cardNumber,
            expiration_date: expirationDate,
            security_cvc: cvc,
        };

        console.log("DATA: ", data);

        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/cards`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const newCard = response.json();

            setBank('');
            setCardName('');
            setBalance(0);
            setMinPayment(0);
            setCreditLimit(0);
            setCardNumber('');
            setExpirationDate('');
            setCVC(0);
        } else {
            console.error(response);
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
                        Add New Card
                    </h1>
                    <img src={payment} alt='discount'
                    className='w-[48px] h-[48px]' />
                    <form className="bg-white w-full max-w-lg rounded-[20px]" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label 
                                    className="block uppercase tracking-wide 
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-first-name"
                                >
                                    Bank 
                                </label>
                                <input 
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-bank" 
                                    type="text" 
                                    onChange={handleBankChange}
                                    placeholder="Enter Bank Name"
                                    value={bank} 
                                />
                                {/* <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p> */}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label 
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-last-name"
                                >
                                    Name
                                </label>
                                <input 
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    type="text"
                                    onChange={handleCardNameChange}
                                    placeholder="Enter Card Name"
                                    value={cardName}
                                />
                                {/* <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p> */}
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label 
                                    className="block uppercase tracking-wide 
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-first-name"
                                >
                                    Card Balance 
                                </label>
                                <input 
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-bank" 
                                    onChange={handleBalanceChange}
                                    value={balance} 
                                />
                                {/* <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p> */}
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label 
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-last-name"
                                >
                                    Min. Payment
                                </label>
                                <input 
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    onChange={handleMinPaymentChange}
                                    value={minPayment}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label 
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-last-name"
                                >
                                    Credit Limit
                                </label>
                                <input 
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"
                                    type="text"
                                    onChange={handleCreditLimitChange}
                                    value={creditLimit}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-6">
                            <label 
                                className="block uppercase tracking-wide 
                                text-gray-700 text-xs font-bold mb-2" 
                                htmlFor="grid-card-number"
                            >
                                Card Number
                            </label>
                            <input 
                                className="appearance-none block w-full
                                bg-gray-200 text-gray-700 border border-gray-200
                                rounded py-3 px-4 mb-3 leading-tight
                                focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-password"
                                type="text"
                                onChange={handleCardNumberChange}
                                placeholder="**** **** **** ****"
                                value={cardNumber}
                            />
                            {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label 
                                    className="block uppercase tracking-wide 
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-first-name"
                                >
                                    Exp Date 
                                </label>
                                <input 
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-bank" 
                                    type="datetime-local"
                                    onChange={handleExpirationDateChange}
                                    value={expirationDate} 
                                />
                                {/* <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p> */}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label 
                                    className="block uppercase tracking-wide
                                    text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="grid-last-name"
                                >
                                    CVC
                                </label>
                                <input 
                                    className="appearance-none block w-full
                                    bg-gray-200 text-gray-700 border border-gray-200
                                    rounded py-3 px-4 mb-3 leading-tight
                                    focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-cvc"
                                    onChange={handleCVCChange}
                                    value={cvc}
                                />
                                {/* <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p> */}
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <button 
                                className="bg-teal-500 hover:bg-teal-400 text-white 
                                font-bold mb-4 py-2 px-4 rounded focus:outline-none 
                                focus:shadow-outline" 
                                type="submit"
                            >
                                Add Card
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

export default CardForm;