import Button from '@/components/Elements/Button';
import Text from '@/components/Elements/Text';
import { useFetchUserById } from '@/features/profil';
import { useKonfirmasiTransaksi } from '@/features/transaction';
import { useFetchTvById } from '@/features/tv';
import { ToRupiah } from '@/lib/toRupiah';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'react-toastify';

const FormKonfirmasi = ({ data, onClick }) => {
    const queryClient = useQueryClient()

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

    const { data: television } = useFetchTvById(data.tvId)
    const {data: user} = useFetchUserById(data.userId)

    const { mutate: orderConfirm } = useKonfirmasiTransaksi({
        onSuccess: () => {
            queryClient.invalidateQueries('fetch.transaksi')
            queryClient.invalidateQueries('fetch.statistik')
            toast.success("Berhasil dikonfirmasi", { style: { backgroundColor: "#00a96e" } })

            document.getElementById("scanQrCode").close()
            scanQr(!isScan)
            setIsResult(false)
        },
        onError: () => {
            toast.error("Gagal dikonfirmasi, coba lagi", { style: { backgroundColor: "#ff5861" } })

            document.getElementById("scanQrCode").close()
            scanQr(!isScan)
            setIsResult(false)
        }
    })

    const handleKonfirmasi = () => {
        event.preventDefault()
        orderConfirm(data)
    }


    return (
        <form className='max-w-xl block space-y-4' action="" method='POST' onSubmit={handleKonfirmasi}>
            <div className='flex flex-col gap-y-2 items-center justify-center w-full'>
                {/* <figure className='aspect-square max-w-24'>
                                <ImagePreview className="rounded-full" src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + user?.data.data.picture} />
                            </figure> */}
                <h1 className='font-medium text-lg'>{user?.data.fullname}</h1>
            </div>

            <div className="block space-y-2">
                <h1 className='font-semibold'>Rincian transaksi</h1>
                <Text title="Status Konfirmasi">
                    <span className={`min-w-36 badge ${renderStatusKonfirmasi().style} font-semibold text-white p-3 md:p-4`}>
                        <label className='text-sm' htmlFor="">{renderStatusKonfirmasi().status}</label>
                    </span>
                </Text>
                <Text title="Status Pembayaran">
                    <span className={`min-w-36 badge ${renderStatusBermain().style} font-semibold text-white p-3 md:p-4`}>
                        <label className='text-sm' htmlFor="">{renderStatusBermain().status}</label>
                    </span>
                </Text>
                {/* <Text title="Tempat">{data.television.name}</Text>
                <Text title="Nomor Urut">{data.television.nomorUrut}</Text>
                <Text title="Tipe Ruangan">{data.television.roomType}</Text>
                <Text title="Tanggal">{data.date}</Text>
                <Text className="max-w-36 line-clamp-1" title="ID Transaksi">{data.id}</Text>
                <Text title="Lama Bermain">{data.time.length} Jam</Text>
                <Text title="Waktu">{data.time[0].open} - {data.time[data.time.length - 1].close}</Text> */}
            </div>
            <hr />
            {/* <div className='block'>
                <Text title="Jumlah">x {data.time.length}</Text>
                <Text title="Harga">{ToRupiah(television?.data.psPrice + television?.data.roomPrice)}</Text>
            </div> */}
            <hr />
            {/* <div className='flex justify-between'>
                <h1 className='font-semibold'>Total</h1>
                <h1 className='font-semibold'>{ToRupiah((television?.data.psPrice + television?.data.roomPrice) * data.time.length)}</h1>
            </div> */}
            <div className={` gap-2 flex flex-col md:flex-row justify-evenly`}>
                <Button className="text-white btn-error w-full md:btn-wide" onClick={onClick}>Batalkan</Button>
                <Button type='submit' className="text-white btn-success w-full md:btn-wide" onClick={handleKonfirmasi}>Konfirmasi</Button>
            </div>
        </form>
    )
}

export default FormKonfirmasi