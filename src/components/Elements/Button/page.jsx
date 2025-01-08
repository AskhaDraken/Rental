"use client"

import Modal from '@/components/Elements/Modal/Modal.jsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileUser from '../Button/Profile.jsx'
import { X } from "react-feather"
import Ubah from '../Button/Ubah.jsx'
import { usePostLogout } from '@/features/auth.js';

const ButtonProfileCustomer = () => {

  const navigate = useNavigate


  return (
    <details className='dropdown p-4 rounded-md flex flex-row justify-center shadow-md'>

      <summary tabIndex={0} role='button' className='flex items-center justify-center button '>
        <img src='/liken.png' alt="" className='h-12 rounded-full' />
      </summary>
      <ul className="menu dropdown-content translate-y-16 -translate-x-12 bg-white rounded-xl z-10 absolute w-44 p-2 shadow-md">

        {/* profile */}
        <li>
          <button
            className="text-lg text-black"
            onClick={() => document.getElementById('modalprofile').showModal()}
          >
            Profil
          </button>
        </li>
        <Modal id="modalprofile" className="bg-secondary" onClick={() => document.getElementById('modalprofile').close()}>
          {/* <X className='text-white absolute top-4 right-4 cursor-pointer' onClick={() => { document.getElementById('modalprofile').close(); setIsBayar(true) }} /> */}
          <ProfileUser />
        </Modal>

        {/* ubah password */}
        <li>
          <button
            className='text-black text-lg'
            onClick={() => document.getElementById('modalprofile2').showModal()}
          >
            Ubah Kata Sandi
          </button>
        </li>
        <Modal id="modalprofile2" className="bg-secondary" onClick={() => document.getElementById('modalprofile2').close()}>
          <X className='text-white absolute top-4 right-4 cursor-pointer' onClick={() => { document.getElementById('modalprofile2').close(); setIsBayar(true) }} />
          <Ubah />
        </Modal>

        <li><button className='text-red-600 text-lg' onClick={usePostLogout}>Kaluar</button></li>
      </ul>
    </details>
  )
}

export default ButtonProfileCustomer