import React from 'react'

const Input = ({type, placeholder,value, onChange, name}) => {
    return (
        <input
        className='w-96 h-12 bg-white/30 px-2 py-3 input input-bordered input-neutral border-white font-poppins text-white text-xl'
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        />
    )
}

export default Input