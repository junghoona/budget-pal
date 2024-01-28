import AOS from 'aos';
import 'aos/dist/aos.css';
import Popup from 'reactjs-popup';
import Button from '../../Button';
import React, { useEffect } from 'react';
import BudgetForm from '../../Budgets/BudgetForm';
import styles, { layout } from "../../../style";
import budget from "../../../Assets/budget-banner.png";

function BudgetBanner() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section
      className={`${layout.section}
      rounded-[20px] bg-teal-900 shadow-lg mb-10`}
      data-aos="fade-left"
      data-aos-duration="1500"
    >
      <div className={`${layout.sectionInfo} ml-20`}>
        <h2 className={styles.heading}>Find a
        better card deal <br className='sm:block
        hidden'/>in few easy steps.</h2>
        <p className={`${styles.paragraph}
        max-w-[470px] mt-5`}>Euismod in pellentesque
          massa placerat. Sapien eget mi proin sed.
          Egestas erat imperdiet sed euismod nisi.
        </p>
        <div className='flex flex-row flex-wrap
        sm:mt-10 mt-6'>
          <Popup
            trigger={<button>
              <Button styles='mt-10 mr-10'
              content='Add Budget'/></button>
            }
            modal
            nested
          >
            {(close) => (
              <div>
                <div>
                  <BudgetForm close={close} />
                </div>
              </div>
            )}
          </Popup>
          <Button styles='mt-10 mr-10' content='View all Budgets'/>
        </div>
      </div>
      <div className={layout.sectionImg}>
        <img src={budget} alt='card' className='w-[75%] h-[100%]' />
      </div>
    </section>
  );
}

export default BudgetBanner;