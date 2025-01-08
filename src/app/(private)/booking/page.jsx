"use client"
import React, { useEffect, useState } from 'react'
import Modal from '@/components/Elements/Modal/Modal'
import { useFetchPlaystation } from '@/features/playstation'
import { ToRupiah } from '@/lib/toRupiah'
import ModalLayout from '@/components/Elements/Modal/Modal'
import ListTv from '@/components/Fragments/List/ListTv'
import CardPlaystation from '@/components/Fragments/Card/CardPlaystation'

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
                <CardPlaystation item={item} key={index}/>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Booking