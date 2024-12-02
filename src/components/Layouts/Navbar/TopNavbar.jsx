import Button from "@/components/Elements/Button/page.jsx"
import Link from "next/link"
// import BurgerNavbar from "./BurgerNavbar"
import { useState } from "react"

const TopNavbar = () => {
  const [isClick, setIsClick] = useState(false)

  const toggleNavbar = () => {
    setIsClick(!isClick)
  }

  return (
    <div>
      <div className=" justify-center w-full flex bg-third stikcy ">
        <nav className="countainer mx-auto max-w-7xl inline-flex items-center justify-between w-full text-white ">
          <span className="text-5xl font-Slackey">Eternity</span>
          <div className=" gap-10 hidden md:inline-flex">
            <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold' href="/">Home</Link>
            <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold' href="/game">Game</Link>
            <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold' href="/booking">Booking</Link>
          </div>
          <div className="text-2xl font-Slackey items-center hidden md:flex">
            <Button />
          </div>
          <div className="md:hidden text-white text-2xl px-5" onClick={() => setIsClick(!isClick)}>
          ☰
        </div>
        </nav>
      </div>
      {   
        isClick && (
          <div className=" flex justify-center md:hidden bg-third">
            <div className="p-3">
              <Link href="/" className="font-poppins font-bold block text-xl text-white p-3 hover:text-gray-400 transition-all active:scale-110 rounded-xl duration-150" onClick={() => setIsOpen(false)} >Home</Link>
              <Link href="/game" className="font-poppins font-bold text-white block text-xl p-3 hover:text-gray-400 active:scale-110 transition-transform duration-200" onClick={() => setIsOpen(false)}>Game</Link>
              <Link href="/booking" className="font-poppins font-bold block text-xl text-white p-3 hover:text-gray-400 active:scale-110 rounded-xl duration-150 " onClick={() => setIsOpen(false)}>Booking</Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default TopNavbar