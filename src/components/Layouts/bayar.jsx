"use client"

import React, { useState } from 'react'
import { IoRemoveOutline } from "react-icons/io5";
// import ListTv from '../Fragments/ListTv';
import ModalLayout from '../Elements/Modal/Modal';
import Pembayaran from './pembayaran';
import { X } from 'react-feather';

const Bayar = ({ data, title, id, description, onClick }) => {
  const [isBayar, setIsBayar] = useState(false)
  const [index, setIndex] = useState(null)

  const handleClickTv = (i) => {
    setIsBayar(true)
    setIndex(i)
  }
  
  return (
    <>
      <div className="flex justify-center card bg-third w-80 h-52 shadow-xl rounded-xl" >
        <div className="card-body ">
          <h2 className="card-title flex justify-center">{title}</h2>
          <div className='flex justify-center'>
            <IoRemoveOutline className='text-3xl' />
          </div>
          <p>{description}</p>
        </div>
        <button onClick={() => document.getElementById("modal" + id).showModal()}>Checkout</button>
      </div>

      <ModalLayout id={"modal" + id} className="bg-white" onClick={() => document.getElementById("modal" + id).close()}>

        {
          isBayar ? <Pembayaran data={data[index]} onClick={() => { setIsBayar(false);  }} /> : (
            <div className='grid grid-cols-2 auto-rows-auto gap-4 w-fit'>
              {/* <div className='absolute'> */}
              <X className='cursor-pointer absolute text-black flex top-3 justify-end ' onClick={() => window.location.href = '/booking'} />
              {/* </div> */}
              {
                data?.map((item, index) => {
                  
                  return <button className='btn btn-info' onClick={() => handleClickTv(index)}> {item.name}
                  </button>

                })
              }
            </div>
          )
        }
      </ModalLayout>
    </>
  )
}

export default Bayar