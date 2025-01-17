import React from 'react'
import ListJam from '../../List/ListJam'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCheckoutTransaksi } from '@/features/transaction'
import Swal from 'sweetalert2'
import { useOrderStore } from '@/store/orderStore'
import { jwtDecode } from 'jwt-decode'
import { IoIosArrowDropleft } from "react-icons/io";
import { useFetchRoomById } from '@/features/room'

const CardTelevisionDetail = ({ item, onClick }) => {

    const state = useOrderStore()
    const { data: session } = useSession()
    const queryClient = useQueryClient()

    const route = useRouter()

    const { mutate: checkout, status } = useCheckoutTransaksi({
        onSuccess: () => {
            if(session) {
                const {role} = jwtDecode(session.user.token)
                
                if(role == "admin") {
                    document.getElementById("orderManual").close()
                } else if(role == "user"){
                    document.getElementById("modalCheckout" + item.psId).close()
                }
            }
            queryClient.invalidateQueries(['fetch.transaksi'])
            state.clearJam([])
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Berhasil Checkout",
                confirmButtonText: "Lihat Transaksi",
                showConfirmButton: true,

            }).then((result) => {
                if (result.isConfirmed) {
                    if (session) {
                        const { role } = jwtDecode(session.user.token)
                        if (role === "user") {
                            route.push("/transaksi")
                        } else {
                            document.getElementById("modalCheckout" + item.psId).close()
                        }
                    }
                }
            })
        },
        onError: () => {
            document.getElementById("modalCheckout" + item.psId).close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Melakukan Checkout",
            })
        }
    })

    const { data: room } = useFetchRoomById(item.roomId)

    const handleSubmit = () => {
        event.preventDefault()
        const body = {
            rentalId: item.rentalId,
            tvId: item.id,
            jam: state.jam
        }
        
        checkout(body)
    }
    return (
        <div className='flex flex-col items-start gap-4'>
            <div className='inline-flex gap-2 items-center hover:scale-[102%] cursor-pointer' onClick={onClick}>
                <IoIosArrowDropleft size={36} color='#541d7b' />
                <h1 className='font-semibold text-secondary text-lg'>Kembali</h1>
            </div>

            <div className='inline-flex gap-4'>
                <span className='w-52 h-52 bg-secondary rounded'>

                </span>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-lg font-bold text-black'>{item.name}</h1>
                    <h1 className='font-normal text-black'>Nomor Urut {item.nomorUrut}</h1>
                    <h1 className='font-light text-black'>{room?.data.name}</h1>
                    {/* <h1 className='font-bold text-black'>{room?.data.description}</h1> */}
                </div>
            </div>
            <ListJam data={item} />
            <form id={item.id} method='POST' action="#" className='flex justify-end w-full' onSubmit={handleSubmit}>

                <button className={`btn bg-third text-white btn-info btn-wide ${status === "pending" ? "btn-disabled" : ""} ${state.jam.length < 1 ? "btn-disabled" : ""}`} type='submit'>
                    {
                        status === "pending" ? <span className="loading loading-dots loading-lg"></span> : <h1 className='font-semibold text-base'>Pesan Sekarang</h1>
                    }
                </button>
            </form>
        </div>
    )
}

export default CardTelevisionDetail