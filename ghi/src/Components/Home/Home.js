import { 
    CardBanner,
    BudgetBanner,
    Hero,
    Navbar,
    MainBanner,
    TransactionBanner
} from "../../Components/index";
import styles from "../../style";

const features = [
    {
      id: 1,
      title: "Add",
      value: "a Card",
    },
    {
      id: 2,
      title: "Plan",
      value: "a Budget",
    },
    {
      id: 3,
      title: "Record",
      value: "new Transactions",
    },
];

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
                <section className={`${styles.flexCenter}
                flex-row flex-wrap sm:mb-20 mb-6`}>
                    {features.map((feature) => (
                        <div key={feature.id} className={`flex-1 flex justify-start items-center flex-row m-3`}>
                        <h4 className='font-poppins
                        font-semibold xs:text-[40px]
                        text-[30px] xs:leading-[53px]
                        leading-[43px] text-white'>{feature.title}</h4>
                        <p className='font-poppins
                        font-normal xs:text-[20px]
                        text-[18px] xs:leading-[26px]
                        leading-[21px] text-slate-300 uppercase ml-4'>{feature.value}</p>
                        </div>
                    ))}
                </section>
                <MainBanner />
                <CardBanner />
                <BudgetBanner />
                <TransactionBanner />
                </div>
            </div>
        </div>
    )
}

export default Home;