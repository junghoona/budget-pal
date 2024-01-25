import React from 'react'
import styles, { layout } from "../../../style";
import card from "../../../Assets/credit-card.png";
import budget from "../../../Assets/budget.png";
import transaction from "../../../Assets/transaction.png";
import Button from "../../Button";

const features = [
  {
    id: 1,
    icon: card,
    title: "Add a Card",
    content: "Choose a card that you want to keepThe best credit cards offer some tantalizing combinations of promotions and prizes",
  },
  {
    id: 2,
    icon: budget,
    title: "Plan a Budget",
    content: "We take proactive steps to make sure your information and transactions are secure",
  },
  {
    id: 3,
    icon: transaction,
    title: "Record New Transactions",
    content: "Record new transactions as you spend to keep track of your spending habits. Be aware of your transaction history."
  }
]

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 
  rounded-[20px] ${index !== features.length - 1 ? 
  "mb-6" : "mb-0"} bg-teal-900 hover:bg-gradient-to-r 
  from-teal-900 to-teal-700 shadow-lg`}>
    <div className={`w-[64px] h-[64px] 
    rounded-full ${styles.flexCenter}`}
    >
      <img src={icon} alt="icon" 
      className='w-[100%] h-[100%] object-contain' />
    </div>
    <div className='flex-1 flex flex-col ml-3'>
      <h4 className='font-poppins font-semibold
      text-white text-[18px] leading-[23px]
      mb-1'>
        {title}
      </h4>
      <p className='font-poppins font-normal
      text-neutral-200 text-[16px] leading-[24px]
      mb-1'>
        {content}
      </p>
    </div>

  </div>
)

const MainBanner = () => {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading}>You do 
        the business, <br className='sm:block 
        hidden' /> we'll handle the money. </h2>
        <p className={`${styles.paragraph} 
        max-w-[470px] mt-5`}> With the right 
        credit card, you can improve your 
        financial life by building credit,
        earning rewards and saving money. 
        But with hundreds of credit cards 
        on the market.</p>

        <Button styles='mt-10' content='Get Started' />
      </div>

      <div className={`${layout.sectionImg}
      flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...
            feature} index={index} />
        ))}
      </div>

    </section>
  )
}

export default MainBanner