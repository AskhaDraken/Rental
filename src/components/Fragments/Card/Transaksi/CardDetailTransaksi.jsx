import { usePatchCancelTransaksi, usePatchTransaksi } from '@/features/transaction'
import { ToRupiah } from '@/lib/toRupiah'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import CryptoJS from 'crypto-js'
import Text from '@/components/Elements/Text'
import { useFetchTvById } from '@/features/tv'
import { jwtDecode } from 'jwt-decode'
import { useFetchUserById } from '@/features/profil'

const CardDetailTransaksi = ({ data }) => {


    const { data: session } = useSession()
    const queryClient = useQueryClient()
    const { data: television } = useFetchTvById(data.tvId)
    const {data: user} = useFetchUserById(data.userId)


    useEffect(() => {

        const snapScript = process.env.NEXT_PUBLIC_MIDTRANS_URL
        const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY

        const script = document.createElement("script")
        script.src = snapScript
        script.setAttribute("data-client-key", clientKey)
        script.async = true

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }

    }, [])



    const { mutate: orderUpdate } = usePatchTransaksi({
        onSuccess: () => {
            toast.success("Pesananmu berhasil diboking", { style: { backgroundColor: "#00a96e" } })
        }
    })


    const handleBayar = () => {
        document.getElementById("modalPesanan" + data.id).close()
        // alert(data.snapToken)
        window.snap.pay(data.snapToken, {
            onSuccess: (result) => {
                orderUpdate(data)

                toast.success("Berhasil ditambahkan pemesanan", { style: { backgroundColor: "#00a96e" } })
            },
            onError: (result) => {
                toast.error("Gagal melakukan checkout" + result, { style: { backgroundColor: "#ff5861" } })
            }
        })
    }

    const { mutate: cancelOrder } = usePatchCancelTransaksi({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.order"] })
            toast.success("Pesanan Berhasil di batalkan", { style: { backgroundColor: "#00a96e" } })
            document.getElementById("modalPesanan" + data.id).close()
        },
        onError: () => {
            document.getElementById("modalPesanan" + data.id).close()
            Swal.fire({
                title: 'Gagal untuk dibatalkan',
                // text: result.response.data.message,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
            })
        }
    })

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

    if (session) {
        const { role } = jwtDecode(session.user.token)
        if(role === "user") {
            return (
                <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
                    <div className='block space-y-6 max-w-xl'>
                        <div className="block space-y-2">
                            <h1 className='font-semibold'>Rincian transaksi</h1>
                            <Text title="Status">
                                <span className={`min-w-36 badge ${renderStatusBermain().style} font-semibold text-white p-3 md:p-4`}>
                                    <label className='text-sm' htmlFor="">{renderStatusBermain().status}</label>
                                </span>
                            </Text>
                            <Text title="Nomor Urut">{data.television.nomorUrut}</Text>
                            <Text title="Nama Playstation">{data.television.playstationName}</Text>
                            <Text title="Tempat">{data.television.name}</Text>
                            <Text title="Tipe Ruangan">{data.television.roomType}</Text>
                            <Text className="max-w-36 line-clamp-1" title="ID Transaksi">{data.id}</Text>
                            <Text title="Lama Bermain">{data.time.length} Jam</Text>
                            <Text title="Waktu">{data.time[0].open} - {data.time[data.time.length - 1].close}</Text>
                        </div>
                        <hr />
                        <div className='block'>
                            <Text title="Jumlah">x {data.time.length}</Text>
                            <Text title="Harga">{ToRupiah(television?.data.psPrice + television?.data.roomPrice)}</Text>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                            <h1 className='font-semibold'>Total</h1>
                            <h1 className='font-semibold'>{ToRupiah((television?.data.psPrice + television?.data.roomPrice) * data.time.length)}</h1>
                        </div>
        
                        <div className={`${data.status === "success" || renderStatusBermain().status === "Dibatalkan" ? "hidden" : "flex"} gap-2 flex-col md:flex-row justify-evenly`}>
                            <button
                                className="btn btn-error w-full md:btn-wide text-white"
                                onClick={() => cancelOrder({ id: data.id, tvId: data.tvId })}>
                                Batalkan
                            </button>
                            <button
                                className="btn btn-success w-full md:btn-wide text-white"
                                onClick={handleBayar}>
                                Bayar
                            </button>
                        </div>
                    </div>
                    <div className={`${data.status === "success" ? "flex" : "hidden"} flex-col items-center justify-center gap-4`}>
                        <div className='w-fit border rounded-xl shadow-md p-4'>
                            <QRCode
                                size={256}
                                value={CryptoJS.AES.encrypt(JSON.stringify({}), process.env.NEXT_PUBLIC_KEY).toString()}
                            />
                        </div>
                        <label className='font-normal text-lg' htmlFor="">QR Code Order</label>
                    </div>
                </div>
            )
        } else if(role === "admin") {
            return (
                <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
                    <div className='block space-y-6 max-w-xl'> 

                        <div className='flex flex-col gap-y-2 items-center justify-center w-full'>
                            {/* <figure className='aspect-square max-w-24'>
                                <ImagePreview className="rounded-full" src={process.env.NEXT_PUBLIC_API + "/api/v1/user/picture/" + user?.data.data.picture} />
                            </figure> */}
                            <h1 className='font-medium text-lg'>{user?.data.fullname}</h1>
                        </div>

                        <div className="block space-y-2">
                            <h1 className='font-semibold'>Rincian transaksi</h1>
                            <Text title="Status">
                                <span className={`min-w-36 badge ${renderStatusBermain().style} font-semibold text-white p-3 md:p-4`}>
                                    <label className='text-sm' htmlFor="">{renderStatusBermain().status}</label>
                                </span>
                            </Text>
                            <Text title="Tempat">{data.television.name}</Text>
                            <Text title="Nomor Urut">{data.television.nomorUrut}</Text>
                            <Text title="Tipe Ruangan">{data.television.roomType}</Text>
                            <Text title="Tanggal">{data.date}</Text>
                            <Text className="max-w-36 line-clamp-1" title="ID Transaksi">{data.id}</Text>
                            <Text title="Lama Bermain">{data.time.length} Jam</Text>
                            <Text title="Waktu">{data.time[0].open} - {data.time[data.time.length - 1].close}</Text>
                        </div>
                        <hr />
                        <div className='block'>
                            <Text title="Jumlah">x {data.time.length}</Text>
                            <Text title="Harga">{ToRupiah(television?.data.psPrice + television?.data.roomPrice)}</Text>
                        </div>
                        <hr />
                        <div className='flex justify-between'>
                            <h1 className='font-semibold'>Total</h1>
                            <h1 className='font-semibold'>{ToRupiah(television?.data.psPrice + television?.data.roomPrice)}</h1>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export default CardDetailTransaksi