import { useFetchGameFavorit } from '@/features/game'
import React from 'react'
import CardGameFavorit from '../Card/Game/CardGameFavorit'

const ListGameFavorit = () => {
    const { data: listGame, isLoading } = useFetchGameFavorit()
    console.log(listGame?.data);
    
    return (
        <div className=' h-full flex flex-col items-center justify-center gap-8'>
            <h1 className='flex justify-center  font-bold text-3xl py-5'>3 Game Terfavorit</h1>
            <div className="w-full h-full overflow-x-scroll p-4">

                <div className='flex justify-center items-start gap-10 h-full'>
                    {
                        isLoading ? <>Loading...</> : listGame?.data.favoritGame.map((item, index) => (
                            <CardGameFavorit item={item} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ListGameFavorit