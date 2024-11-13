import React from 'react'

const Label = ({htmlFor, children}) => {
    return (
        <label htmlFor={htmlFor} className='text-white font-poppins font-medium text-2xl'>{children}</label>
    )
}

export default Label