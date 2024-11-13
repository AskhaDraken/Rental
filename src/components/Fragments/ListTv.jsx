"use client"

import React, { useState } from 'react'
import Pembayaran from '../Layouts/pembayaran'

const ListTv = ({onClick}) => {
    return (
        <div className='grid grid-cols-4 auto-rows-auto gap-4 w-fit'>
            {
                Array.from({ length: 6 }).map((_, index) => (
                    <button className='btn btn-info' onClick={onClick}>TV {index + 1}</button>
                    // 
                ))
            }
        </div>
    )
}

export default ListTv