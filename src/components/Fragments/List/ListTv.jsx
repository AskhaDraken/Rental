import { useFetchTv } from '@/features/tv'
import { ToRupiah } from '@/lib/toRupiah'
import React, { useState } from 'react'
import { CheckboxButton } from '../CheckboxButton'
import ListJam from './ListJam'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useCheckoutTransaksi } from '@/features/transaction'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

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

    // Routing
    const route = useRouter()

    const { mutate: checkout } = useCheckoutTransaksi({
        onSuccess: () => {
            document.getElementById("modalCheckout" + psId).close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: data.message,
                confirmButtonText: "Lihat Transaksi",
                showConfirmButton: true,

            }).then((result) => {
                if(result.isConfirmed) {
                    route.push("/transaksi")
                }
            })
        },
        onError: () => {
            document.getElementById("modalCheckout" + psId).close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Melakukan Checkout",
            })
        }
    })

    const handleSubmit = () => {
        event.preventDefault()
        const body = {
            rentalId: listTv?.data[position].rentalId,
            tvId: listTv?.data[position].id,
            jam: [
                {
                    "id": 3,
                    "open": "11:00",
                    "close": "12:00"
                },

                {
                    "id": 4,
                    "open": "12:00",
                    "close": "13:00"
                },

                {
                    "id": 5,
                    "open": "13:00",
                    "close": "14:00"
                }
            ]
        }
        checkout(body)
    }


    return isLoading ? (<span>Loading...</span>) : listTv?.data.length > 0 ? (
        <>
            {
                isSelect ? isSelect ? (
                    <div className='flex flex-col items-start gap-4'>
                        <button className='btn btn-info' onClick={() => setIsSelect(false)}>Back</button>
                        <h1 className='font-bold text-black'>List TV {tvData[position].nomor}</h1>
                        <ListJam tvId={listTv?.data[position].id} />
                        <form action="#" id={listTv?.data[position].id} className='flex justify-end w-full' onSubmit={handleSubmit}>
                            <button className='btn btn-info btn-wide' type='submit'>Booking Sekarang</button>
                        </form>
                    </div>
                ) : <></> : (
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