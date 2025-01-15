import ModalLayout from '@/components/Elements/Modal/Modal'
import { useFetchTvById } from '@/features/tv'
import { ToRupiah } from '@/lib/toRupiah'
import React from 'react'
import CardDetailTransaksi from './CardDetailTransaksi'

const CardTransaksi = ({ data }) => {

    const { data: television, isLoading } = useFetchTvById(data.tvId)

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

    const body = {
        ...data,
        television: television?.data
    }

    return isLoading ? (
        <div className='p-4 w-full h-24 border shadow grid grid-cols-5 gap-4 place-items-center'>
            <div className='inline-flex gap-4 w-full'>
                <span className='skeleton w-10 rounded-full h-8'></span>
                <span className='skeleton w-full rounded-full h-8'></span>
            </div>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
        </div>
    ) : (
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

            <div className='bg-white hidden md:flex flex-col lg:flex-row items-start lg:items-center justify-between w-full border shadow p-6 rounded-md cursor-pointer' onClick={() => document.getElementById("modalPesanan" + data.id).showModal()}>
                <h4 className='whitespace-nowrap' htmlFor="">Tv {television?.data.nomorUrut}</h4>
                <h4 className=' line-clamp-1' htmlFor="">{television?.data.playstationName}</h4>
                <h4 className=' line-clamp-1' htmlFor="">{television?.data.roomName}</h4>
                <h4 className='whitespace-nowrap' htmlFor="">{television?.data.type} </h4>
                <h4 className='whitespace-nowrap' htmlFor="">{data.time[0].open} - {data.time[data.time.length - 1].close}</h4>
                <h4 className='whitespace-nowrap' htmlFor="">{data.date}</h4>
                <h4 className='whitespace-nowrap' htmlFor="">{ToRupiah((television?.data.psPrice + television?.data.roomPrice) * data.time.length)}</h4>
                <span className={`min-w-40 badge ${renderStatusBermain().style} font-semibold text-md text-white p-4`}>
                    <h4 htmlFor="">{renderStatusBermain().status}</h4>
                </span>
            </div>
            <ModalLayout id={"modalPesanan" + data.id} title="Detail Pesanan" onClick={() => document.getElementById("modalPesanan" + data.id).close()}>
                <CardDetailTransaksi data={body} />
                {/* <DetailPemesanan orderId={data.id} data={dataOrder} token={token} /> */}
            </ModalLayout>
        </>
    )
}

export default CardTransaksi