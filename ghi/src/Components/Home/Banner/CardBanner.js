import AOS from 'aos';
import 'aos/dist/aos.css';
import Popup from 'reactjs-popup';
import Button from "../../Button";
import React, { useEffect } from 'react';
import CardForm from '../../Cards/CardForm';
import styles, { layout } from "../../../style";
import card from "../../../Assets/card-banner.png";

function CardBanner() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section
      className={`${layout.sectionReverse}
      rounded-[20px] bg-teal-900 shadow-lg mb-10`}
      data-aos="fade-right"
      data-aos-duration="1500"
    >
      <div className={layout.sectionImgReverse}>
        <img src={card} alt='card' className='w-[75%]
        h-[100%] relative z-[5]' />

        <div className='absolute z-[3] -left-1/2
        top-0 w-[50%] h-[50%] rounded-full
        white__gradient' />
        <div className='absolute z-[0] -left-1/2
        top-0 w-[50%] h-[50%] rounded-full
        pink__gradient' />
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading}>Easily
        control your <br className='sm:block
        hidden' /> billing & invoicing.</h2>
        <p className={`${styles.paragraph}
        max-w-[470px] mt-5`}>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris
          nisi ut
        </p>
        <div className='flex flex-row flex-wrap
        sm:mt-10 mt-6'>
          <Popup
            trigger={<button>
              <Button styles='mt-10 ml-10'
              content='Add Card' /></button>
            }
            modal
            nested
          >
            {(close) => (
            <div>
              <div>
                <CardForm close={close}/>
              </div>
            </div>
            )}
          </Popup>
          <Button styles='mt-10 ml-10' content='View all Cards' />
        </div>
      </div>
    </section>
  );
}

export default CardBanner;
