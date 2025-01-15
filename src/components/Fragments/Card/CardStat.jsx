import React from 'react'

const CardStat = ({ name, title, total, icon }) => {
    return (
        <div className='flex items-start justify-between w-full h-32 p-8 rounded-lg shadow space-y-4 border bg-white '>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <label className='font-semibold text-xl text-secondary' htmlFor="">{title}</label>
                <label className='font-bold text-3xl  text-secondary' htmlFor={name}>{total}</label>
            </div>
            <div className='rounded-full bg-secondary text-white p-2'>
            {icon}

            </div>
        </div>
    )
}

export default CardStat