import Button from "@/components/Elements/Button/page.jsx"
import Link from "next/link"

const TopNavbar = () => {

  return (
    <div className="flex items-center justify-centerw-full bg-third p-4 stikcy">
      <nav className="countainer mx-auto max-w-7xl inline-flex items-center justify-between w-full  text-white ">
        <span className="text-5xl font-Slackey">Eternity</span>
        <div className="inline-flex gap-10 ">
          <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold'href="/">Home</Link>
          <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold'href="/game">Game</Link>
          <Link className='text-xl font-poppins cursor-pointer hover:bg-white/20 rounded-xl transition-all duration-150 p-2 font-bold'href="/booking">Booking</Link>
        </div>
        <div className="text-2xl font-Slackey">
          <Button/>
        </div>
      </nav>
    </div>
  )
}

export default TopNavbar