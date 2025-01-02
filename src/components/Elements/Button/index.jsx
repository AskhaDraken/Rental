import React from 'react'

const Button = ({ children, type = "button" }) => {
    return (
        <div className='mt-10'>
            <button type={type} className='bg-gradient-to-r to-primary from-secondary rounded-md h-12 text-white text-2xl font-semibold w-full'>{children}</button>
        </div>
    )
}

export default Button