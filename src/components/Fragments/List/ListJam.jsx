import useAxiosAuth from '@/hooks/useAxiosAuth'
import { ToRupiah } from '@/lib/toRupiah'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import Jam from '../Jam/Jam'
import { useOrderStore } from '@/store/orderStore'
import { useFetchRoomById } from '@/features/room'
import { useFetchPlaystationById } from '@/features/playstation'

const ListJam = ({ data }) => {

    const axiosAuth = useAxiosAuth()
    const { data: listJam, isLoading } = useQuery({
        queryKey: ['fetch.jam', data.id],
        queryFn: async () => {
            return await axiosAuth.get(`/api/jam?id=${data.id}`)
        }
    })

    const { data: room } = useFetchRoomById(data.roomId)
    const { data: playstation } = useFetchPlaystationById(data.psId)

    return (
        <div className='flex flex-col gap-4 items-start justify-start'>
            <h1 className='font-bold text-black'>List Jam</h1>
            <div className='grid grid-cols-4 gap-4'>
                {
                    isLoading ? <span className="loading loading-dots loading-lg"></span> : listJam?.data.data.jadwal.map((item, index) => (
                        <Jam key={index} item={item} price={parseInt(room?.data.price) + parseInt(playstation?.data.price)} />
                    ))
                }
            </div>
        </div>
    )
}

export default ListJam