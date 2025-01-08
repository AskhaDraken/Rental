import useAxiosAuth from '@/hooks/useAxiosAuth'
import { ToRupiah } from '@/lib/toRupiah'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ListJam = ({tvId}) => {

    const axiosAuth = useAxiosAuth()
    const { data: listJam, isLoading } = useQuery({
        queryKey:['fetch.jam', tvId],
        queryFn: async () => {
            return await axiosAuth.get(`/api/jam?id=${tvId}`)
        }
    })

    return (
        <div className='flex flex-col items-start justify-start'>
            <h1 className='font-bold text-black'>List Jam</h1>
            <div className='grid grid-cols-4 gap-4'>
                {
                    isLoading ? <span className="loading loading-dots loading-lg"></span> : listJam?.data.data.jadwal.map((item, index) => (
                        <div key={index} className='p-4 flex flex-col bg-blue-600 rounded-md gap-4 items-center justify-center cursor-pointer hover:scale-105 transition-all'>
                            <h1 className='font-light text-sm'>60 Menit</h1>
                            <div className='inline-flex gap-2'>
                                <h3 className='font-bold text-base'>{item.open}</h3>
                                <h3 className='font-bold text-base'>{item.close}</h3>
                            </div>
                            <h1 className='font-normal text-lg'>{ToRupiah(listJam?.data.data.price)}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListJam