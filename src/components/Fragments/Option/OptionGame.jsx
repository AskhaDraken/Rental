import { useFetchGamePublicById } from '@/features/game'
import { useFetchRoomById } from '@/features/room'
import React from 'react'

const OptionGame = ({ id }) => {
    const { data: game, isLoading } = useFetchGamePublicById(id)
    
    return <option className='text-black' value={game?.data.id}>{game?.data.name}</option>

}

export default OptionGame