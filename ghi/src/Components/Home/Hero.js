import React from 'react';
import styles from '../../style';
import money from '../../Assets/money.png';
import payment from '../../Assets/payment.png';

const Hero = () => {
  return (
    <section id='home' className={`flex
    md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart}
      flex-col xl:px-0 sm:px-16 px-6`}>
        <div className='flex flex-row
        items-center py-[6px] px-4
        bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[10px] mb-2'>
          <img src={payment} alt='discount'
          className='w-[32px] h-[32px]' />
          <p className={`${styles.paragraph} ml-2`}>
            <span className='text-white'>Add a 
            </span> Card {" "}
            <span className='text-white'>to  
            </span> Get Started
          </p>
        </div>

        <div className='flex flex-row
        justify-between items-center w-full'>
          <h1 className='flex-1 font-poppins
          font-semibold ss:text-[72px] text-[52px]
          text-white ss:leading-[100px] 
          leading-[75px]'>
          Your Money<br className='sm:block 
          hidden' /> {" "}
          <span className='text-gradient'>Management 
          </span> 
          </h1>
        </div>

        <h1 className='font-poppins font-semibold
        ss:text-[68px] text-[52px] text-white
        ss:leading-[100px] leading-[75px] 
        w-full'>Simplified.</h1>
        <p className={`${styles.paragraph} max-w-[470px]
        mt-5`}>This web application
        methodology to identify the credit cards 
        most likely to fit your needs. We examine
        annual percentage rates, annual fees.</p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}> 
        <img src={money} alt='money'
        className='w-[100%] h-[100%] relative
        z-[5]' />

        <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient' />
        <div className='absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient' />
        <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 white__gradient' />

      </div>
    </section>
  )
}

export default Hero