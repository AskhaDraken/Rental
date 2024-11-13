"use client"

import Modal from '@/components/Elements/Modal/Modal.jsx'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileUser from '../Button/Profile.jsx'
import { X } from "react-feather"
import Ubah from '../Button/Ubah.jsx'

const ButtonProfileCustomer = () => {
  const [isOpen, setIsOpen]=useState(false)
  const [isOpen2, setIsOpen2]=useState(false)

  const profile = () => {
    document.getElementById('modalprofile').showModal()
    console.log('open');
    
  }
  const profile2 = () => {
    document.getElementById('modalprofile2').showModal()
    console.log('open');
    
  }
  const [isBuka, setIsBuka] = useState(true)

  const navigate = useNavigate

  const handlelogout = () => {
    navigate('/')
  }

  return (
    <div className='dropdown drpdown-buttom rounded-md flex flex-row justify-center shadow-md gap-x-9'>
      
      <div tabIndex={0} role='button' className='btn btn-ghost'>
          <img src='/liken.png' alt="" className='w-12 h-12 rounded-full' />
      </div>
        <ul tabIndex={0} className="dropdown-content translate-y-16 -translate-x-14 menu bg-white rounded-box z-[-1] w-52 P-2 shadow-md">

          {/* profile */}
            <li>
              <button className="text-lg text-black" onClick={() => document.getElementById('modalprofile').showModal()}>Profil</button>
            </li>
            <Modal id="modalprofile" className="bg-white" onClick={() => document.getElementById('modalprofile').close()}>
              <ProfileUser/>
              <X className='text-black absolute' onClick={() => {document.getElementById('modalprofile').close(); setIsBayar(true)}}/>
            </Modal>

            {/* ubah password */}
            <li>
              <button className='text-black text-lg' onClick={() => document.getElementById('modalprofile2').showModal()}>Ubah Password</button>
            </li>
            <Modal id="modalprofile2" className="bg-white" onClick={() => document.getElementById('modalprofile2').close()}>
              <Ubah/>
              <X className='text-black absolute' onClick={() => {document.getElementById('modalprofile2').close(); setIsBayar(true)}}/>
            </Modal>

            <li><a href="" className='text-red-600 text-lg' onClick={handlelogout}>Kaluar</a></li>
        </ul>
   </div>   
  )
}

export default ButtonProfileCustomer