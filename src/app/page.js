"use client"
import CardGame from "@/components/Fragments/Card/Game/CardGame";
import { useFetchGame } from "@/features/game";
import { jwtDecode } from "jwt-decode";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
// import Image from "next/image";

import { IoArrowForwardCircleOutline } from "react-icons/io5";


export default function Home() {
  const { data: session, status } = useSession()

  if (status === "authenticated" && session) {
    const role = jwtDecode(session.user.token).role
    if (role === "admin") {
      redirect("/dashboard")
    }

  }
  // axios.get('/api/game')
  const { data: listGame, isLoading, refetch, } = useFetchGame()  


  const fitur = [
    {
      gambar: "/harga.png",
      nama: 'HARGA',
      order: 'Harga mulai dari Rp 15.000'
    },
    {
      gambar: "/game.png",
      nama: 'GAME',
      order: 'Game PS4/ PS5 terbaru'
    },
    {
      gambar: "/consolePS.png",
      nama: 'GAME',
      order: 'Terdapat 20 console PS'
    },
    {
      gambar: "/tv.png",
      nama: 'TV',
      order: 'TV 32 Inch'
    },
    {
      gambar: "/wifi.png",
      nama: 'WIFI',
      order: 'Pass : Eternityrentalps'
    },
    {
      gambar: "/ac.png",
      nama: 'AC',
      order: 'Dilengkapi AC di setiap ruangan'
    },

  ]
  return (
    <div className='flex flex-col relative bg-fourth text-white'>
      {/* Background dashboard */}
      <div className='flex w-full  bg-#14112E h-full justify-center items-center text-3xl'>
        <div>
          <img src="/background1.png" alt="" className='flex-[1_0_100%] md:hidden scale-y-[-1]' />
          <img src="/background1.png" alt="" className='flex-[1_0_100%]' />
        </div>
        <div className=' absolute grid lg:grid-cols-2 grid-cols-1 justify-between items-center'>

          <div className='flex flex-col justify-center items-center'>
            <h1 className='font-poppins text-white  text-4xl font-bold hidden md:block'>KENAPA HARUS BELI MAHAL-MAHAL ?</h1>
            <h2 className='font-poppins text-white text-sm translate-x-[-50%] hidden md:block mt-1'>KALAU BISA RENTAL DENGAN HARGA TERJANGKAU
            </h2>
            {/* <button onClick={() => signIn()}>Login</button> */}
            <button onClick={() => window.location.href = '/booking'} className='font-poppins flex justify-center items-center text-white bg-gradient-to-r from-primary to-secondary md:w-96 w-56 md:h-16 h-10 text-sm md:text-2xl rounded-3xl translate-x-[-38%] mt-3'>Booking Sekarang!
              <IoArrowForwardCircleOutline className='md:text-5xl text-2xl ml-4' />
            </button>
          </div>

          <figure className=''>
            <img src="/logo.png" alt="" className='md:w-full w-80 md:h-full h-72' />
          </figure>
        </div>
      </div>

      <div className="container mx-auto flex flex-col justify-center">
        {/* fitur yang ada */}
        <div className='py-10 bg-fourth'>
          <div className='container'>
            <div className='flex justify-center font-poppins font-bold text-3xl mb-20'>OUR FEATURES</div>
          </div>
          <div className='overflow-auto'>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>
              {
                fitur.map((fitur, index) => {
                  return (
                    <div className='flex flex-col place-items-center' key={index}>
                      <figure className='max-w-24 '>
                        <img src={fitur.gambar} alt="" className='flex-[1_0_100%]' />
                      </figure>
                      <h1 className='font-poppins font-bold text-3xl text-white'>{fitur.nama}</h1>
                      <p className='mb-10'>{fitur.order}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

        {/* Game Terfavorit */}
        <div className=' bg-fourth h-fit block space-y-8'>

          <h1 className='flex justify-center  font-bold text-3xl py-5'>3 Game Terfavorit</h1>
          <div className="w-full h-full overflow-x-scroll p-4">

            <div className='flex justify-start items-start gap-10'>
              {
                listGame?.data.data.map((item, index) => (
                  <CardGame item={item} key={index} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
