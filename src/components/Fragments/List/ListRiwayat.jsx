"use client"
import CardTransaksi from '../Card/Transaksi/CardTransaksi'
import { useFetchRiwayat } from '@/features/riwayat'

const ListRiwayat = () => {
    const { data: listRiwayat, isLoading } = useFetchRiwayat()
    console.log(listRiwayat );
    

    return isLoading ? Array.from({ length: 5 }).map((item, index) => (
        <div className='p-4 w-full h-24 border shadow grid grid-cols-5 gap-4 place-items-center' key={index}>
            <div className='inline-flex gap-4 w-full'>
                <span className='skeleton w-10 rounded-full h-8'></span>
                <span className='skeleton w-full rounded-full h-8'></span>
            </div>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
            <span className='skeleton w-full rounded-full h-8'></span>
        </div>
    )) : listRiwayat?.data.length > 0 ? (
        <div className='block w-full h-full space-y-4'>
            {
                listRiwayat?.data.map((item, index) => (
                    <CardTransaksi data={item} key={index} />
                ))
            }
        </div>

    ) : <h1 className='text-white'>Riwayat masih kosong</h1>
}

export default ListRiwayat