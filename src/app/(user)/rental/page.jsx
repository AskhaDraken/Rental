"use client"

import React, { useState } from 'react'
import Modal from '@/components/Elements/Modal/Modal'
import Bayar from '@/components/Layouts/bayar.jsx'

const Booking = () => {
    const [isBayar, setIsBayar] = useState(true)

    const exData = [
        {
            tittle: "PS4",
            television: [
                {
                    id: 1,
                    name: "Televisi 1",
                    jam: [
                        {
                            id: 1,
                            open: '11:00',
                            close: '12:00',
                            isTersedia: true,
                        },
                        {
                            id: 2,
                            open: '12:00',
                            close: '13:00',
                            isTersedia: true,
                        },
                        {
                            id: 3,
                            open: '13:00',
                            close: '14:00',
                            isTersedia: true,
                        },
                    ]
                },
                // Televisi lainnya di sini
            ]
        },
        {
            tittle: "PS5",
            television: [
                {
                    id: 1,
                    name: "Television1",
                },
                {
                    id: 2,
                    name: "tv2",
                },
            ]
        }
    ]

    return (
        <div className='bg-fourth'>
            <div className='container mx-auto flex flex-col justify-center items-center bg-background bg-fourth min-h-screen px-4 text-white'>
                <img src='/logo.png' alt="" className='max-w-40 md:w-64 mb-8' />

                {/* Playstation 4 */}
                <div className='flex flex-col md:flex-row gap-4 md:gap-10 w-full justify-center items-center'>
                    {
                        exData.map((item, index) => (
                            <div
                                key={index}
                                className='text-center w-full bg-black md:w-auto rounded-lg'>
                                <Bayar
                                    id={"modalCheckout" + index}
                                    data={item.television}
                                    title={item.tittle}
                                    desciption="Memiliki 2 Playstation dan bebas merokok"
                                    onClick={() => document.getElementById('modalCheckout' + index).showModal()}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* <Modal>jfladk</Modal> */}
        </div>
    )
}

export default Booking