"use client"

import ListGameFavorit from "@/components/Fragments/List/ListGameFavorit";
import { useFetchRental, useFetchRentalLocation } from "@/features/rental";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FaMapSigns } from "react-icons/fa";

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

  const { data: rental, isLoading } = useFetchRentalLocation()
  console.log(rental?.data.mapurl);
  

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
        <div className='h-screen w-screen bg-cover' style={{ backgroundImage: "url('/background1.png')" }}>
          {/* <img src="/background1.png" alt="" className='flex-[1_0_100%]' /> */}
        </div>
        <div className='mx-auto container absolute flex w-full lg:grid-cols-2 grid-cols-1 justify-between items-center'>
          <div className="flex flex-col gap-4">

            <div className='flex flex-col justify-center items-start gap-2 bg-secondary/50 p-6 rounded-3xl min-h-48'>
              <h1 className='font-poppins text-white  text-4xl font-bold hidden md:block'>KENAPA HARUS BELI MAHAL-MAHAL ?</h1>
              <p className='font-poppins text-xl text-white max-w-2xl  hidden md:block uppercase'>KALAU BISA RENTAL DENGAN HARGA TERJANGKAU Mau datang ke sini? Klik tombol lokasi dan kita ketemu disana!
              </p>
            </div>
            <div className="inline-flex gap-4 justify-center items-center">
              <button onClick={() => window.location.href = '/booking'} className='font-poppins flex justify-between p-4 items-center text-white bg-gradient-to-r from-primary to-secondary md:w-96 w-56 md:h-16 h-10 text-sm md:text-2xl rounded-full'>Booking Sekarang!
                <IoArrowForwardCircleOutline size={48} />
              </button>

              <a href={rental?.data.mapurl.search(/https/) !== - 1 ? rental?.data.mapurl : `https://${rental?.data.mapurl}`} target="_blank">
                <button className='font-poppins flex justify-between p-4 items-center text-white bg-gradient-to-r from-primary to-secondary md:w-96 w-56 md:h-16 h-10 text-sm md:text-2xl rounded-full'>Lokasi
                  <FaMapSigns size={32} />
                </button>
              </a>
            </div>
          </div>
          <img src="/logo.png" alt="" className='md:w-full w-80 md:h-full h-72 flex-[1_0_100%] max-w-xl' />
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
                    <div className='flex flex-col gap-4 place-items-center' key={index}>
                      <figure className='max-w-36 '>
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
        <ListGameFavorit />
      </div>
    </div>
  )
}
