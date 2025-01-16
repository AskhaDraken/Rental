import { useFetchRoomById } from '@/features/room'
import React from 'react'

const CardTelevision = ({ item, onClick }) => {
  const { data: room } = useFetchRoomById(item.roomId)
  return (
    <div className='flex flex-col gap-2 items-center justify-center cursor-pointer p-4 bg-secondary text-white rounded-md hover:shadow hover:scale-[102%] transition-all' onClick={onClick}>
      <h1 className='font-normal'>{item.name}</h1>
      <h1 className='font-bold text-xl'>No {item.nomorUrut}</h1>
      <h1 className='font-light'>{room?.data.name}</h1>
    </div>
  )
}

export default CardTelevision