import AOS from 'aos';
import 'aos/dist/aos.css';
import Button from "../../Button";
import Popup from 'reactjs-popup';
import React, { useEffect } from 'react';
import styles, { layout } from "../../../style";
import TransactionForm from '../../Transactions/TransactionForm';
import transaction from "../../../Assets/transaction-banner.png";

function TransactionBanner() {
    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <section
            className={`${layout.sectionReverse}
            rounded-[20px] bg-teal-900 shadow-lg mb-10`}
            data-aos="fade-left"
            data-aos-duration="1500"
        >
            <div>
                <img src={transaction} alt='transaction'
                className='w-[75%] h-[100%] relative z-[5]' />

            </div>

            <div className={layout.sectionInfo}>
                <h2 className={styles.heading}>
                    Record new transactions <br className='sm:block
                    hidden' /> as you spend your card.</h2>
                <p className={`${styles.paragraph}
                max-w-[470px] mt-5`}>
                    Record new transactions as you spend
                    to keep track of your spending habits.
                    Be informed about your latest transactions
                    and your transaction history to plan your
                    next financial decision.
                </p>
                <div className='flex flex-row flex-wrap
                sm:mt-10 mt-6'>
                    <Popup
                        trigger={<button>
                            <Button styles='mt-10 ml-10'
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
                    <Button styles='mt-10 ml-10' content='View All Transactions' />
                </div>
            </div>
        </section>
    );
}

export default TransactionBanner;