"use client"

import { useFetchTransaksi } from '@/features/transaction'
import React from 'react'

const Transaksi = () => {
    const { data: listTransaksi, isLoading } = useFetchTransaksi()

    return (
        <div className='bg-fourth'>
            <section className='container mx-auto bg-auto p-16 min-h-screen'>
                {
                    isLoading ? <span className="loading loading-dots loading-lg"></span> : listTransaksi?.data.length > 0 ? listTransaksi?.data.map(
                        (item, index) => (
                            <h1 className='text-white' key={index}>{item.id}</h1>
                        )
                    ) : <h1 className='text-white'>Transaksi masih kosong</h1>
                }
            </section>
        </div>
    )
}

export default Transaksi