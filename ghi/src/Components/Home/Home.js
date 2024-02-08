import { 
    CardBanner,
    BudgetBanner,
    Hero,
    Navbar,
    MainBanner,
    TransactionBanner
} from "../../Components/index";
import styles from "../../style";

const Home = () => {
    return (
        <div className='bg-teal-800 w-full overflow-hidden'>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                </div>
            </div>
            <div className={`bg-teal-800 ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Hero/>
                </div>
            </div>
            
            <div className={`bg-teal-800 ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                <MainBanner />
                {/* <CardBanner /> */}
                <BudgetBanner />
                <TransactionBanner />
                </div>
            </div>
        </div>
    )
}

export default Home;