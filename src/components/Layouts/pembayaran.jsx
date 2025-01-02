"use client"

import React from 'react'
// import Modal from '../Elements/Modal/Modal.jsx'
import { X } from "react-feather"
import { useNavigate } from 'react-router-dom';



const Pembayaran = ({ data, onClick }) => {
    const navigate = useNavigate

    const handlelogout = () => {
        navigate('/booking')
    }
    return (

        <div className="flex flex-col text-center font-bold text-xl gap-y-10 text-black " >
            <label htmlFor="">{data?.id}</label>
            {/* <label htmlFor="">{data?.name}</label> */}
            <X className='cursor-pointer' onClick={onClick} />
            silahkan memilih paket
            <div className='flex flex-col gap-y-6'>
                <div className='flex justify-center gap-2'>
                    {
                        data?.jam.map((item, index) => {
                            // document.getElementById(index).checked = false
                            // console.log(index, document.getElementById(index).value);
                            
                            return (
                                <div className='flex gap-4 bg-primary p-4 text-white rounded-md'>
                                    <input id={index} type="checkbox" defaultChecked={false}/>
                                    <label htmlFor="" onClick={ () => document.getElementById(index).checked = true }>{item.open} - {item.close}</label>
                                </div>
                                // <button className={`btn ${item.isTersedia ? "bg-primary" : "btn-disabled"} text-white w-32`}>{item.open} - {item.close}</button>
                            )
                        })
                    }
                    {/* <button className='btn bg-primary text-white w-32'> lama sewa</button> */}
                </div>
                <div className='flex justify-center gap-2'>
                    <button className='btn bg-primary text-white'> pesan sekarang</button>
                </div>
            </div>
        </div>
    )
}

export default Pembayaran

