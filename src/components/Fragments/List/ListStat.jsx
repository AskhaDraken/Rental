import React from 'react'
import { ToRupiah } from '@/lib/toRupiah'
import { IoCheckmarkCircleOutline, IoFileTrayStackedOutline, IoWalletOutline } from 'react-icons/io5'
import { useQuery } from '@tanstack/react-query'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useSession } from 'next-auth/react'
import CardStat from '../Card/CardStat'

const ListStat = () => {
    const axiosAuth = useAxiosAuth()

    const { data: statistik, isLoading } = useQuery({
        queryKey: ['fetch.statistik'],
        queryFn: () => axiosAuth.get(`/api/transaksi/statistik`)
    })
    
    return (
        <div className='flex flex-col md:flex-row gap-6 w-full'>
            {
                false ? Array.from({length: 3}).map((_, i) => (
                    <div  key={i} className='flex flex-col border border- items-center justify-center w-full p-4 h-44 rounded-md shadow-md space-y-4'>
                        <div className="inline-flex justify-center items-center gap-4">
                            <label className='skeleton w-10 h-10' htmlFor=""></label>
                            <label className='skeleton w-52 h-6' htmlFor=""></label>
                        </div>
                        <label className='skeleton w-20 h-6' ></label>
                    </div>
                )) : (
                    <>
                        <CardStat name="totalOrder" title="Total Order" total={statistik?.data.totalOrder || 0} icon={<IoFileTrayStackedOutline size={36} />} />
                        <CardStat name="konfirmasi" title="Konfirmasi" total={statistik?.data.konfirmasi || 0} icon={<IoCheckmarkCircleOutline size={36} />} />
                        <CardStat name="pendapatan" title="Pendapatan" total={ToRupiah(statistik?.data.income)} icon={<IoWalletOutline size={36} />} />
                    </>
                )
            }
        </div>
    )
}

export default ListStat