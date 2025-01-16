"use client"
import ListTransaksi from '@/components/Fragments/List/ListTransaksi'
import { jwtDecode } from 'jwt-decode'
import { useSession } from 'next-auth/react'

const TransaksiPage = () => {

    const { data: session } = useSession()

    const handleTitle = () => {
        if (session) {
            const { role } = jwtDecode(session.user.token)

            if (role === "admin") {
                return <h1 className="text-2xl font-bold text-white">Transaksi</h1>
            }
        }
    }

    return (
        <div className='bg-fourth'>

            <section className='container mx-auto bg-auto p-8 min-h-screen flex flex-col gap-8'>
                {handleTitle()}
                <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 place-items-center grid-rows-1 w-full border hover:shadow transition-all p-2 rounded-md cursor-pointer bg-white'>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Nama</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Nomor Urut</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Tipe</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Jam</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Konfirmasi</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Pembayaran</h4>
                </div>
                <ListTransaksi />
            </section>
        </div>
    )
}

export default TransaksiPage