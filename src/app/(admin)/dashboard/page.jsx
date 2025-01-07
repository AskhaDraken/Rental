import React from 'react'
import Stik from '../../../../public/layout.png'

const Dashboardproviders = () => {

    return (
        <div className='flex flex-col p-10 w-full py-6 bg-background'>
            <div className='w-full flex flex-row justify-between mt-5'>
                <h1 className=' bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text text-3xl font-bold '>
                    Order
                </h1>
                <img src={Stik} className='h-12'>
                </img>
            </div>
            <div className='flex w-full flex-row justify-center gap-x-28 mt-10'>
                <div className='w-full h-full mt-20 px-20 font-semibold font-body'>
                    <div className='flex w-full justify-center py-4'>
                        <a href="Management">
                            <button className="btn bg-primary text-white">
                                Lihat Selengkapnya
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className='w-full h-full mt-10 px-10 font-semibold font-body absolut text-white p-5'>
                <h1>Management</h1>
            </div>
            <div className='flex flex-row gap-4'>
                <div className="card bg-white w-80 h-200 shadow-sm shadow-black">
                    <figure>
                        <img
                            src="https://img.id.my-best.com/product_images/8b24be64b0a63bf3d0e5aac56013dacb.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=c7e58c84878cc727d56ea64869340063"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                </div>
                <div className="card bg-white w-80 h-200 shadow-sm shadow-black">
                    <figure>
                        <img
                            src="https://img.id.my-best.com/product_images/8b24be64b0a63bf3d0e5aac56013dacb.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=c7e58c84878cc727d56ea64869340063"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                </div>
                <div className="card bg-white w-80 h-200 shadow-sm shadow-black">
                    <figure>
                        <img
                            src="https://img.id.my-best.com/product_images/8b24be64b0a63bf3d0e5aac56013dacb.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=c7e58c84878cc727d56ea64869340063"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                </div>
                <div className="card bg-white w-80 h-200 shadow-sm shadow-black">
                    <figure>
                        <img
                            src="https://img.id.my-best.com/product_images/8b24be64b0a63bf3d0e5aac56013dacb.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=c7e58c84878cc727d56ea64869340063"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-center py-4'>
                <a href="Game">
                    <button className="btn bg-primary text-white">Lihat Selengkapnya</button>
                </a>
            </div>
        </div>
    )
}

export default Dashboardproviders