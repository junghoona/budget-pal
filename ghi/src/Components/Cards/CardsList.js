import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from "../Navbar";
import { 
    Searchbar,
    FilterDropdown,
    CardComponent
} from "../index";
import styles, { layout } from "../../style";
import React, { useEffect, useState } from 'react';

function CardsList() {
    const [cards, setCards] = useState([]);

    const fetchData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/cards`
        );
        if (response.ok) {
            const data = await response.json();
            setCards(data);
        } else {
            console.error(`ERROR: ${response}`);
        }
    };

    useEffect(() => {
        AOS.init();
        fetchData();
    }, []);

    return (
        <div className="bg-teal-600 w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>

            <div className={`bg-teal-600 ${styles.flexStart}`}>
                <div className={`${styles.boxWidth} mt-10 mb-10`}>
                    <Searchbar />
                </div>
            </div>

            <div className={`bg-teal-600 ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <section id="cards" className={`flex
                    md:flex-row flex-col ${styles.paddingY}`}>
                        <div className={`flex-1 ${styles.flexStart}
                        flex-col xl:px-0 sm:px-16 px-6`}>
                            <h1 className="flex-1 font-poppins
                            font-semibold ss:text-[72px] text-[52px]
                            text-white ss:leading-[100px]
                            leading-[75px] mb-5">
                                {cards.length} Cards
                            </h1>
                        </div>
                        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}> 
                            <div className="flex space-x-10">
                                <FilterDropdown name="Bank" />
                                <FilterDropdown name="By Budget" />
                            </div>
                            <div className='absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient' />
                            <div className='absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient' />
                            <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 white__gradient' />

                        </div>
                    </section>

                    <section 
                        id="features"
                        className={layout.section}
                        data-aos="fade-up"
                        data-aos-duration="1500"
                    >
                        <div className={layout.sectionInfo}>
                            <div className={`${layout.sectionImg}
                            flex-row space-x-40`}>
                                {cards.map((card, index) => (
                                    <CardComponent key={card.id} {...
                                        card} index={index} />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div> 

                <div className='absolute z-[0] w-[30%] h-[80%] rounded-full bottom-40 white__gradient' />

            </div>
        </div>
    );
};

export default CardsList;