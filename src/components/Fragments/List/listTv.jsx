import { useFetchTv } from '@/features/tv'
import { ToRupiah } from '@/lib/toRupiah'
import React, { useState } from 'react'
import { CheckboxButton } from '../CheckboxButton'

const ListTv = ({ psId }) => {
    const { data: listTv, isLoading } = useFetchTv(psId)

    

    const tvData = [
        {
            nomor: 1,
            price: 10000
        },
        {
            nomor: 2,
            price: 10000
        },
        {
            nomor: 3,
            price: 10000
        },
        {
            nomor: 4,
            price: 10000
        },
        {
            nomor: 5,
            price: 10000
        },
    ]

    const [isSelect, setIsSelect] = useState(false)
    const [position, setPosition] = useState(0)


    const handleClickPosition = (index) => {
        setIsSelect(true)
        setPosition(index)
    }


    return isLoading ? (<span>Loading...</span>) : listTv?.data.length > 0 ? (
        <>
            {
                isSelect ? (
                    <div className='flex flex-col items-start gap-4'>
                        <button className='btn btn-info' onClick={() => setIsSelect(false)}>Back</button>
                        <h1 className='font-bold text-black'>List TV {tvData[position].nomor}</h1>
                        <div className='flex items-center'>
                            <h1 className='font-bold text-black'>List Jam</h1>
                        </div>
                        <div className='grid grid-cols-4 gap-4'>

                            {
                                tvData.map((item, index) => (
                                    <div className='p-4 flex flex-col bg-blue-600 rounded-md gap-4 items-center justify-center cursor-pointer hover:scale-105 transition-all'>
                                        <h1 className='font-light text-sm'>60 Menit</h1>
                                        <div className='inline-flex gap-2'>
                                            <h3 className='font-bold text-base'>09:00</h3>
                                            <h3 className='font-bold text-base'>10:00</h3>
                                        </div>
                                        <h1 className='font-normal text-lg'>{ToRupiah(200000)}</h1>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex justify-end w-full'>
                            <button className='btn btn-info btn-wide'>Booking Sekarang</button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 items-start'>
                        <h1 className='font-bold text-black'>List TV</h1>
                        
                        <div className='grid grid-cols-4 gap-4 '>
                            {
                                listTv?.data.map((item, index) => (
                                    <div className='flex flex-col cursor-pointer p-4 bg-blue-600 rounded-md' key={index} onClick={() => handleClickPosition(index)}>
                                        <h1 className='font-semibold'>TV {item.nomorUrut}</h1>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    ) : (
        <h1 className='text-black'>Tidak ada data</h1>
    )
}

export default ListTv