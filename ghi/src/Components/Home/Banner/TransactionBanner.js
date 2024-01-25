import Button from "../../Button";
import styles, { layout } from "../../../style";
import transaction from "../../../Assets/transaction-banner.png";

const TransactionBanner = () => (
    <section className={`${layout.sectionReverse}
    rounded-[20px] bg-teal-900 shadow-lg mb-10`}>
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
                Be aware of your latest transactions 
                and your transaction history.
            </p>
            <div className='flex flex-row flex-wrap
            sm:mt-10 mt-6'>
                <Button styles='mt-10 ml-12' content='Add New Transaction' />
                <Button styles='mt-10 ml-12' content='View All Transactions' />
            </div>
        </div>

    </section>
);

export default TransactionBanner;