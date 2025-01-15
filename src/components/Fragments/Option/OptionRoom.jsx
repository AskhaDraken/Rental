import { useFetchRoomById } from '@/features/room'
import React from 'react'

const OptionRoom = ({ id }) => {
    const { data: room, isLoading } = useFetchRoomById(id)
    
    return <option className='text-black' value={room?.data.id}>{room?.data.name}</option>

}

export default OptionRoom