import { useFetchGamePublicById } from '@/features/game'
import React from 'react'

const CardGameFavorit = ({ item }) => {
    const { data: gameFavorit } = useFetchGamePublicById(item)
    return (
        <div className=" card bg-base-100 w-full h-full shadow-md border rounded-xl">
            <figure className="px-5 pt-5 bg-white relative" >
                <img
                    src={`/upload/${gameFavorit?.data.picture}`}
                    alt="Shoes"
                    className="rounded-xl w-full max-w-96" />
                <span className='absolute bottom-4 left-8 bg-third p-2 border border-white rounded'>
                    <h1 className='font-semibold text-white'>{gameFavorit?.data.type}</h1>
                </span>
            </figure>
            <div className="card-body text-center ">
                <h2 className="card-title text-black">{gameFavorit?.data.name}</h2>
            </div>
        </div>
    )
}

export default CardGameFavorit