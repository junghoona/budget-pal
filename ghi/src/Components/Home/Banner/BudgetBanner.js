import React from 'react'
import Button from '../../Button';
import styles, { layout } from "../../../style";
import budget from "../../../Assets/budget-banner.png";

const BudgetBanner = () => (
  <section className={`${layout.section} 
  rounded-[20px] bg-teal-900 shadow-lg mb-10`}>
    <div className={`${layout.sectionInfo} ml-20`}>
      <h2 className={styles.heading}>Find a
      better card deal <br className='sm:block 
      hidden'/>in few easy steps.</h2>
      <p className={`${styles.paragraph} 
      max-w-[470px] mt-5`}>Euismod in pellentesque 
      massa placerat. Sapien eget mi proin sed. 
      Egestas erat imperdiet sed euismod nisi. </p>

      <Button styles='mt-10' content='Create Budget'/>
    </div>
    <div className={layout.sectionImg}>
      <img src={budget} alt='card' className='w-[75%] h-[100%]' />
    </div>
  </section>
)

export default BudgetBanner;