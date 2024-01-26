import React from 'react'

const Button = ({ styles, content }) => {
  return (
    <button type='button' className={`py-4 px-6 
    bg-gradient-to-r from-emerald-300 to-emerald-400
    font-poppins font-medium text-[18px] text-slate-50 
    rounded-[10px] ${styles}`}>
      {content}
    </button>
  )
}

export default Button