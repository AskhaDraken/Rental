import React from 'react'

const CardGame = ({ item }) => {
    return (
        <div className=" card bg-base-100 w-fit shadow-md border rounded-xl">
            <figure className="px-5 pt-5 bg-white relative" >
                <img

                    src="/gta.jpg"
                    alt="Shoes"
                    className="rounded-xl w-full max-w-72" />
                <span className='absolute bottom-4 left-8 bg-third p-2 border border-white rounded'>
                    <h1 className='font-semibold text-white'>{item.type}</h1>
                </span>
            </figure>
            <div className="card-body text-center ">
                <h2 className="card-title text-black">{item.name}</h2>
            </div>
        </div>
    )
}

export default CardGame