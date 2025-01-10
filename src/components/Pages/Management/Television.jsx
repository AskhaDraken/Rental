import Button from '@/components/Elements/Button'
import React from 'react'

const TelevisionPage = () => {
    return (
        <div className="flex flex-col w-fit gap-4">
            <Button className="btn-info w-fit" >Add Playstation</Button>
            <div className="inline-flex gap-8">
                {
                    Array.from({ length: 3 }).map(() => (
                        <div className="rounded-full p-3 flex items-center justify-center border-2 border-success cursor-pointer hover:scale-105">
                            <h1 className="font-semibold">Standar</h1>
                        </div>
                    ))
                }
            </div>
            <div className="grid grid-cols-3 gap-4">
                {
                    Array.from({ length: 3 }).map(() => (
                        <div className="card bg-base-100 w-96 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Card title!</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default TelevisionPage