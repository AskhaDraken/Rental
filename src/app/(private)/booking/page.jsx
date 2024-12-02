"use client"
import React, { useState } from 'react'
import Modal from '@/components/Elements/Modal/Modal'
import Bayar from '@/components/Layouts/bayar.jsx'
import { X } from 'react-feather'

const Booking = () => {
  // const [isBayar, setIsBayar] = useState(true)


  const exData = [
    {
      tittle: "PS4",
      television: [
        {
          id: 1,
          name: "Televisi 1",
          jam: [
            {
              id: 1,
              open: '11:00',
              close: '12:00',
              isTersedia: true,
            },
            {
              id: 2,
              open: '12:00',
              close: '13:00',
              isTersedia: true,
            },
            {
              id: 3,
              open: '13:00',
              close: '14:00',
              isTersedia: true,
            },
          ]
        },
        {
          id: 2,
          name: "Televisi 2",
          jam: [
            {
              id: 1,
              open: '11:00',
              close: '12:00',
              isTersedia: true,
            },
            {
              id: 2,
              open: '12:00',
              close: '13:00',
              isTersedia: true,
            },
            {
              id: 3,
              open: '13:00',
              close: '14:00',
              isTersedia: true,
            },
          ]
        },
        {
          id: 3,
          name: "Televisi 3",
          jam: [
            {
              id: 1,
              open: '11:00',
              close: '12:00',
              isTersedia: true,
            },
            {
              id: 2,
              open: '12:00',
              close: '13:00',
              isTersedia: true,
            },
            {
              id: 3,
              open: '13:00',
              close: '14:00',
              isTersedia: true,
            },
          ]
        },
        {
          id: 4,
          name: "Televisi 4",
          jam: [
            {
              id: 1,
              open: '11:00',
              close: '12:00',
              isTersedia: true,
            },
            {
              id: 2,
              open: '12:00',
              close: '13:00',
              isTersedia: true,
            },
            {
              id: 3,
              open: '13:00',
              close: '14:00',
              isTersedia: true,
            },
          ]
        },
        {
          id: 5,
          name: "Televisi 5",
          jam: [
            {
              id: 1,
              open: '11:00',
              close: '12:00',
              isTersedia: true,
            },
            {
              id: 2,
              open: '12:00',
              close: '13:00',
              isTersedia: true,
            },
            {
              id: 3,
              open: '13:00',
              close: '14:00',
              isTersedia: true,
            },
          ]
        },
        {
          id: 6,
          name: "Televisi 6",
          jam: [
            {
              id: 1,
              open: '11:00',
              close: '12:00',
              isTersedia: true,
            },
            {
              id: 2,
              open: '12:00',
              close: '13:00',
              isTersedia: true,
            },
            {
              id: 3,
              open: '13:00',
              close: '14:00',
              isTersedia: true,
            },
          ]
        },
      ]
    },
    {
      tittle: "PS5",
      television: [
        {
          id: 1,
          name: "Terlevision1",
        },
        {
          id: 2,
          name: "tv2",
        },
      ]
    }
  ]
  // const [isBayar2, setIsBayar2] = useState(true)
  return (
    <div className='bg-fourth text-white'>
      <div className='mx-auto flex flex-col justify-center items-center bg-background bg-fourth min-h-screen '>
        <img src="/logo.png" alt="" className='max-w-72 ' />

        {/* Playstation 4 */}
        <div className='flex flex-row gap-10'>
          <div className='flex flex-col md:flex-row gap-10 '>

            {
              exData.map((item, index,) => (
                <>
                  <Bayar
                    className='bg-black'
                    id={"modalCheckout" + index}
                    data={item.television}
                    title={item.tittle}
                    desciption="Memiliki 2 Playstation dan bebas merokok"
                    onClick={() => document.getElementById('modalCheckout' + index).showModal()} />
                </>
              ))
            }
          </div>
        </div>
      </div>
      <Modal>jfladk</Modal>
    </div>
  )
}

export default Booking