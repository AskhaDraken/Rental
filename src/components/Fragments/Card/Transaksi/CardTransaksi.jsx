import ModalLayout from '@/components/Elements/Modal/Modal'
import { useFetchTvById } from '@/features/tv'
import { ToRupiah } from '@/lib/toRupiah'
import React from 'react'
import CardDetailTransaksi from './CardDetailTransaksi'
import { useSession } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'
import { useFetchUserById } from '@/features/profil'

const CardTransaksi = ({ data }) => {

    const { data: television, isLoading } = useFetchTvById(data.tvId)
    const { data: user } = useFetchUserById(data.userId)

    const renderStatusBermain = () => {
        if (data.status === "pending") {
            return { style: "badge-error", status: "Menunggu Pembayaran" }
        } else if (data.status === "failed") {
            return { style: "badge-error", status: "Dibatalkan" }
        } else if (data.status === "success") {
            return { style: "badge-success", status: "Selesai" }
        } else {
            return { style: "badge-error", status: "Invalid" }
        }
    }

    const renderStatusKonfirmasi = () => {
        if (data.isConfirm === "pending") {
            return { style: "badge-warning", status: "Pending" }
        } else if (data.isConfirm === "reject") {
            return { style: "badge-error", status: "Reject" }
        } else if (data.isConfirm === "accept") {
            return { style: "badge-success", status: "Accept" }
        } else {
            return { style: "badge-error", status: "Invalid" }
        }
    }

    const body = {
        ...data,
        television: television?.data
    }

    const { data: session } = useSession()    

    if (session && data) {
        const { role } = jwtDecode(session.user.token)

        if (role === "user") {
            return (
                <>
                    <div className='md:hidden flex flex-col gap-4 w-full shadow p-4 rounded-md cursor-pointer' onClick={() => document.getElementById("modalPesanan" + data.id).showModal()}>
                        <div className="inline-flex items-center justify-center w-full border-b pb-2">
                            <h4 className='whitespace-nowrap font-semibold' htmlFor="">Tv {television?.data.nomorUrut}</h4>
                            <span className={`ml-auto min-w-20 badge ${renderStatusBermain().style} font-semibold text-white p-3`}>
                                <h4 className='text-xs' htmlFor="">{renderStatusBermain().status}</h4>
                            </span>
                        </div>
                        <div className='inline-flex gap-x-4'>
                            <figure className='aspect-square max-w-24 rounded-md border'>
                                {/* <ImagePreview src="/LogoIcon.png" /> */}
                            </figure>
                            <div className='flex flex-col'>
                                <h4 className='line-clamp-1 text-base' htmlFor="">{television?.data.name}</h4>
                                <h4 className='text-sm' htmlFor="">{data.time[0].open}-{data.time[data.time.length - 1].close}</h4>
                                <h4 className='text-sm' htmlFor="">{data.date}</h4>

                            </div>
                        </div>
                        <h4 className='whitespace-nowrap text-md text-end' htmlFor="">Total: {ToRupiah(television?.data.price)}</h4>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 place-items-center grid-rows-1 w-full border hover:shadow transition-all p-4 rounded-md cursor-pointer bg-white' onClick={() => document.getElementById("modalPesanan" + data.id).showModal()}>
                        <h4 className='text-black whitespace-nowrap' htmlFor="">Tv {television?.data.nomorUrut}</h4>
                        <h4 className='text-black line-clamp-1' htmlFor="">{television?.data.playstationName}</h4>
                        <h4 className='text-black whitespace-nowrap' htmlFor="">{television?.data.roomName} </h4>
                        <h4 className='text-black whitespace-nowrap text-center' htmlFor="">{data.time[0].open} - {data.time[data.time.length - 1].close}</h4>
                        <h4 className='text-black whitespace-nowrap' htmlFor="">{data.date}</h4>
                        <h4 className='text-black whitespace-nowrap' htmlFor="">{ToRupiah((television?.data.psPrice + television?.data.roomPrice) * data.time.length)}</h4>
                        <span className={`min-w-40 badge ${renderStatusBermain().style} font-semibold text-md text-white p-4`}>
                            <h4 htmlFor="">{renderStatusBermain().status}</h4>
                        </span>
                    </div>
                    <ModalLayout id={"modalPesanan" + data.id} title="Detail Pesanan" onClick={() => document.getElementById("modalPesanan" + data.id).close()}>
                        {
                            isLoading ? <h1>Mohon tunggu</h1> : <CardDetailTransaksi data={body} />
                        }
                    </ModalLayout>
                </>
            )
        } else if (role === "admin") {

            return (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 place-items-center grid-rows-1 w-full border hover:shadow transition-all p-4 md:p-6 rounded-md cursor-pointer bg-white' onClick={() => document.getElementById("modalPesanan" + data.id).showModal()}>
                        <div className='inline-flex gap-4 items-center justify-start w-full'>
                            {/* <figure className='aspect-square max-w-16 md:max-w-12'>
                                <ImagePreview className="rounded-full" src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + user?.data.data.picture} />
                            </figure> */}
                            <div className='flex flex-col'>
                                <label el className='line-clamp-1 h-fit text-lg font-medium' htmlFor="">{user?.data.fullname}</label>
                                <label className='w-full line-clamp-1 h-fit text-sm text-gray-600 md:hidden' htmlFor="">{television?.data.playstationName} / {television?.data.roomName}</label>
                                <label className='w-full line-clamp-1 h-fit text-sm text-gray-600 md:hidden' htmlFor="">{data.time[0].open} - {data.time[data.time.length - 1].close}</label>
                            </div>
                        </div>
                        <h4 className='whitespace-nowrap' htmlFor="">Tv {television?.data.nomorUrut}</h4>

                        <label className='w-full line-clamp-1 h-fit hidden lg:flex' htmlFor="">{television?.data.playstationName} / {television?.data.roomName}</label>
                        <label className='w-full line-clamp-1 h-fit hidden md:flex text-center items-center justify-center' htmlFor="">{data.time[0].open} - {data.time[data.time.length - 1].close}</label>
                        <span className={`min-w-40 hidden md:flex badge ${renderStatusKonfirmasi().style} font-semibold text-md text-white p-4`}>
                            <label htmlFor="">{renderStatusKonfirmasi().status}</label>
                        </span>
                        <span className={`min-w-40 hidden md:flex badge ${renderStatusBermain().style} font-semibold text-md text-white p-4`}>
                            <label htmlFor="">{renderStatusBermain().status}</label>
                        </span>
                    </div>

                    <ModalLayout id={"modalPesanan" + data.id} title="Detail Pesanan" onClick={() => document.getElementById("modalPesanan" + data.id).close()}>
                        {
                            isLoading ? <h1>Mohon tunggu</h1> : <CardDetailTransaksi data={body} />
                        }
                    </ModalLayout>
                </>
            )
        }
    }

}

export default CardTransaksi