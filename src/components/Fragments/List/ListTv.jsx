import { useFetchTv } from '@/features/tv'
import React, { useEffect, useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import OptionRoom from '../Option/OptionRoom'
import CardTelevision from '../Card/Television/CardTelevision'
import CardTelevisionDetail from '../Card/Television/CardTelevisionDetail'

const ListTv = ({ psId }) => {
    const state = useOrderStore()
    const [roomId, setRoomId] = useState("")
    const queryParams = {
        psId: psId,
        roomId: roomId
    }

    const { data: listTv, isLoading, refetch } = useFetchTv(queryParams)
    const [isSelect, setIsSelect] = useState(false)
    const [position, setPosition] = useState(0)

    useEffect(() => {
        refetch()
    },[roomId])


    const handleClickPosition = (index) => {
        setIsSelect(true)
        setPosition(index)
    }

    // Routing


    return isLoading ? (<span>Loading...</span>) : listTv?.data.data.length > 0 ? (
        <>
            {
                isSelect ? <CardTelevisionDetail item={listTv?.data.data[position]} onClick={() => { setIsSelect(false); state.clearJam([]) }}/> : (
                    <div className='flex flex-col gap-4 items-start'>                        <h1 className='font-bold text-black'>List TV</h1>
                        <select className="select select-bordered w-full max-w-xs text-black" onChange={(event) => setRoomId(event.target.value)}>
                            <option disabled selected>Filter</option>
                            <option>Semua</option>

                            {
                                isLoading ? <h1>loading</h1> : listTv?.data.filter.map((item, index) => (
                                    <OptionRoom key={index} id={item} />
                                ))
                            }
                        </select>
                        <div className='grid grid-cols-4 gap-4 '>
                            {
                                listTv?.data.data.map((item, index) => (
                                    !isLoading ? <CardTelevision key={index} item={item} onClick={() => handleClickPosition(index)}/> : <h1>Loading...</h1>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    ) : (
        <h1 className='text-black'>Tidak ada data</h1>
    )
}

export default ListTv