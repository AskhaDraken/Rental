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
import { useOrderStore } from '@/store/orderStore'
import OptionRoom from '../Option/OptionRoom'

const ListTv = ({ psId }) => {
    const state = useOrderStore()
    const { data: listTv, isLoading } = useFetchTv(psId)
    
    const [isSelect, setIsSelect] = useState(false)
    const [position, setPosition] = useState(0)


    const handleClickPosition = (index) => {
        setIsSelect(true)
        setPosition(index)
    }

    // Routing
    const route = useRouter()

    const { mutate: checkout, status } = useCheckoutTransaksi({
        onSuccess: () => {
            document.getElementById("modalCheckout" + psId).close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Berhasil Checkout",
                confirmButtonText: "Lihat Transaksi",
                showConfirmButton: true,

            }).then((result) => {
                if (result.isConfirmed) {
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
            rentalId: listTv?.data.data[position].rentalId,
            tvId: listTv?.data.data[position].id,
            jam: state.jam
        }
        checkout(body)
    }

    const renderLoading = () => {
        if (status === "pending") {
            return (
                <div className='absolute w-screen h-screen bg-black/50 '>

                </div>
            )
        }
    }    

    return isLoading ? (<span>Loading...</span>) : listTv?.data.data.length > 0 ? (
        <>
            {
                isSelect ? (
                    <div className='flex flex-col items-start gap-4'>
                        <button className='btn btn-info' onClick={() => setIsSelect(false)}>Back</button>
                        <h1 className='font-bold text-black'>List TV {listTv?.data.data[position].nomorUrut}</h1>
                        <ListJam data={listTv?.data.data[position]} />
                        <form id={listTv?.data.data[position].id} method='POST' action="#" className='flex justify-end w-full' onSubmit={handleSubmit}>

                            <button className={`btn btn-info btn-wide ${status === "pending" ? "btn-disabled" : ""}`} type='submit'>
                                {
                                    status === "pending" ? <span className="loading loading-dots loading-lg"></span> : "Booking Sekarang"
                                }
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 items-start'>
                        <h1 className='font-bold text-black'>List TV</h1>
                        <select className="select select-bordered w-full max-w-xs text-black">
                            <option disabled selected>Filter</option>

                            {
                                isLoading ? <h1>loading</h1> : listTv?.data.filter.map((item, index) => (
                                    <OptionRoom key={index} id={item} />
                                ))
                            }
                        </select>
                        <div className='grid grid-cols-4 gap-4 '>
                            {
                                listTv?.data.data.map((item, index) => (
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