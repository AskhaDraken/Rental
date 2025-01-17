import React from 'react'

const LayoutManagement = ({ title, children }) => {
    return (
        <div className='w-full flex flex-col gap-4'>
            <h1 className='font-semibold text-white text-xl'>{title}</h1>
            <hr />
            {children}
        </div>
    )
}

export default LayoutManagement