import ButtonProfileCustomer from "@/components/Elements/Button/page.jsx"
import Button from "@/components/Elements/Button/page.jsx"
import { usePostLogout } from "@/features/auth"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import BurgerNavbar from "./BurgerNavbar"
import { useState } from "react"

const TopNavbar = () => {
  const [isClick, setIsClick] = useState(false)
  const { data: session, status } = useSession()
  const toggleNavbar = () => {
    setIsClick(!isClick)
  }

  const renderStatusLogin = () => {
    const router = useRouter()
    if (status === "authenticated") {
      return (
        <div className="text-2xl font-Slackey items-center hidden md:flex">
          <ButtonProfileCustomer />
        </div>
      )
    } else {
      return (
        <div className="text-2xl font-Slackey items-center hidden md:flex gap-4">
          <button className="btn btn-warning text-white" onClick={() => signIn()}>Login</button>
          <button className="btn btn-warning text-white" onClick={() => router.push("/register")}>Daftar</button>
        </div>
      )

    }
  }

  const renderPrivate = () => {
    if(status === "authenticated"){
      return (
        <>
          <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold' href="/booking">Rental</Link>
          <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold' href="/booking">Pesanan</Link>
        </>
      )
    }
  }

  return (
    <>
      <div className=" justify-center w-full flex bg-third sticky top-0 p-2 border-b border-white z-50">
        <nav className="countainer mx-auto max-w-7xl inline-flex items-center justify-between w-full text-white ">
          <span className="text-5xl font-Slackey">Eternity</span>
          <div className=" gap-10 hidden md:inline-flex">
            <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold' href="/">Home</Link>
            <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold' href="/game">Game</Link>
            {
              renderPrivate()
            }

          </div>
          {renderStatusLogin()}
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
    </>
  )
}

export default TopNavbar