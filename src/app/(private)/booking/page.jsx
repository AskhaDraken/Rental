"use client"
import React, { useEffect, useState } from 'react'
import Modal from '@/components/Elements/Modal/Modal'
import { useFetchPlaystation } from '@/features/playstation'
import { ToRupiah } from '@/lib/toRupiah'
import ModalLayout from '@/components/Elements/Modal/Modal'
import ListTv from '@/components/Fragments/List/listTv'

const Booking = () => {
  const { data: playstation, isLoading } = useFetchPlaystation()


  return (
    <div className='bg-fourth text-white min-h-screen'>
      <section className='container mx-auto bg-auto p-16' >
        <div className='flex flex-col gap-10 items-center '>
          <img src="/logo.png" alt="" className='max-w-72 ' />

          <div className='flex flex-wrap gap-4'>
            {
              playstation?.data.map((item, index,) => (
                <>
                  <div className="card bg-third w-96 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>
                      <h2 className='font-semibold text-lg'>{ToRupiah(item.price)}</h2>
                      <p>{item.description}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => document.getElementById("modalCheckout" + item.id).showModal()}>Booking Sekarang</button>
                      </div>
                    </div>
                  </div>
                  <ModalLayout id={"modalCheckout" + item.id} onClick={() => document.getElementById("modalCheckout" + item.id).close()}>
                    <ListTv psId={item.id} />
                  </ModalLayout>
                </>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Booking