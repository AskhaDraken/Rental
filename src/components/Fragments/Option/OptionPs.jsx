import { useFetchPlaystationById } from '@/features/playstation'
import { useFetchRoomById } from '@/features/room'
import React from 'react'

const OptionPs = ({ id }) => {
    const { data: room, isLoading } = useFetchPlaystationById(id)
    
    return <option className='text-black' value={room?.data.id}>{room?.data.name}</option>

}

export default OptionPs