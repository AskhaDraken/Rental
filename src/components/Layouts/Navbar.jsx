import React from 'react'
import FragmentNavbar from '../Fragments/Fragment-Navbar'
import ButtonProfileCustomer from '../Elements/Button/page'
import { Outlet } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className='bg-fourth flex flex-col space-y-4'>
      <div className='flex justify-center flex-col items-center bg-third w-full h-fit sticky top-0' style={{ zIndex: '10' }}>
        <div className='flex flex-row py-3 items-center justify-between px-10 text-white w-full  '>
          <h1 className='font-Slackey text-3xl'>ETERNITY</h1>
          <FragmentNavbar />
        <div>
            <ButtonProfileCustomer/>
        </div> 
        </div>
      </div>
      <div className='flex flex-col md:h-full bg-fourth min-h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default Navbar