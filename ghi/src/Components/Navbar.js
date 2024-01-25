import { useState } from 'react'
import { Link } from 'react-router-dom';
import { VscMenu, VscClose } from "react-icons/vsc";


const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    
  return (
    <nav className='w-full flex py-8 
    justify-between items-center navbar'>
        <ul className='list-none sm:flex hidden 
        justify-end items-center flex-1'>
            <li className={`font-poppins font-normal
            cursor-pointer text-[20px] mr-14 text-white
            hover:text-emerald-200 transition-color duration-300`}>
                <Link to={`${process.env.PUBLIC_URL}/`}>
                    Home
                </Link>
            </li>
            <li className={`font-poppins font-normal
            cursor-pointer text-[20px] mr-14 text-white
            hover:text-emerald-200 transition-color duration-300`}>
                <Link to={`${process.env.PUBLIC_URL}/cards/`}>
                    Cards
                </Link>
            </li>
            <li className={`font-poppins font-normal
            cursor-pointer text-[20px] mr-14 text-white
            hover:text-emerald-200 transition-color duration-300`}>
                <Link to={`${process.env.PUBLIC_URL}/budgets/`}>
                    Budgets
                </Link>
            </li>
            <li className={`font-poppins font-normal
            cursor-pointer text-[20px] mr-0 text-white
            hover:text-emerald-200 transition-color duration-300`}>
                <Link to={`${process.env.PUBLIC_URL}/transactions/`}>
                    Transactions
                </Link>
            </li>
        </ul>

        <div className='sm:hidden flex flex-1
        justify-end items-center'>
            {toggle ? <VscClose className='w-[34px] h-[34px] 
            cursor-pointer fill-white object-contain' 
            onClick={() => setToggle((prev) => !prev)} /> : 
            <VscMenu className='w-[28px] h-[28px] 
            cursor-pointer fill-white object-contain' 
            onClick={() => setToggle((prev) => !prev)} />}
{/* "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300" */}
            <div 
            className={`${toggle ? 'flex' : 
            'hidden'} p-6 bg-teal-800
            absolute top-20 right-0 mx-4
            my-2 min-w-[140px] rounded-xl z-10 duration-300
            sidebar`}
            >
                <ul className='list-none flex
                flex-col justify-end items-center 
                flex-1'>
                    <li className={`font-poppins font-normal
                    cursor-pointer text-[16px] mb-4 text-white`}>
                        <Link to={`${process.env.PUBLIC_URL}/`}>
                            Home
                        </Link>
                    </li>
                    <li className={`font-poppins font-normal
                    cursor-pointer text-[16px] mb-4 text-white`}>
                        <Link to={`${process.env.PUBLIC_URL}/cards/`}>
                            Cards
                        </Link>
                    </li>
                    <li className={`font-poppins font-normal
                    cursor-pointer text-[16px] mb-4 text-white`}>
                        <Link to={`${process.env.PUBLIC_URL}/budgets/`}>
                            Budgets
                        </Link>
                    </li>
                    <li className={`font-poppins font-normal
                    cursor-pointer text-[16px] mr-0 text-white`}>
                        <Link to={`${process.env.PUBLIC_URL}/transactions/`}>
                            Transactions
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
