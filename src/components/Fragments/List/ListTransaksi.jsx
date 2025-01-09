"use client"
import { useFetchTransaksi } from '@/features/transaction'
import CardTransaksi from '../Card/Transaksi/CardTransaksi'

const ListTransaksi = () => {
    const { data: listTransaksi, isLoading } = useFetchTransaksi()
    
    return isLoading ? <span className="loading loading-dots loading-lg"></span> : listTransaksi?.data.length > 0 ? (
        <div className='block w-full h-full space-y-4'>
            {
                listTransaksi?.data.map((item, index) => (
                    <CardTransaksi data={item} key={index}/>
                )) 
            }
        </div>
        
    ) : <h1 className='text-white'>Transaksi masih kosong</h1>
}

export default ListTransaksi