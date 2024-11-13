"use client"
import { signIn, useSession } from "next-auth/react";
// import Image from "next/image";

import { IoArrowForwardCircleOutline } from "react-icons/io5";


export default function Home() {
  const {data} = useSession
  // axios.get('/api/game')
  console.log(data);
  
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
        <img src="/background1.png" alt="" className='flex-[1_0_100%]' />
        <div className=' absolute grid grid-cols-2 justify-between items-center'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='font-poppins text-white font-bold text-4xl'>KENAPA HARUS BELI MAHAL-MAHAL ?</h1>
            <h2 className='font-poppins text-white text-sm translate-x-[-50%] mt-1'>KALAU BISA RENTAL DENGAN HARGA TERJANGKAU
            </h2>
            {/* <button onClick={() => signIn()}>Login</button> */}
            <button onClick={() => window.location.href = '/booking'} className='font-poppins flex justify-center items-center text-white bg-gradient-to-r from-primary to-secondary w-96 h-16 rounded-3xl translate-x-[-38%] mt-3'>Booking Sekarang!
              <IoArrowForwardCircleOutline className='text-5xl ml-4' />
            </button>
          </div>
          <div className=''>
            <img src="/logo.png" alt="" className='w-full h-full' />
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col justify-center">
        {/* fitur yang ada */}
        <div className='py-10 bg-fourth'>
          <div className='container'>
            <div className='flex justify-center font-poppins font-bold text-3xl mb-20'>OUR FEATURES</div>
          </div>
          <div className='overflow-auto'>

            <div className='flex md:grid flex-row md:grid-cols-3 gap-4'>
              {
                fitur.map((fitur, index) => {
                  return (
                    <div className='flex flex-col place-items-center' key={index}>
                      <figure className='max-w-56'>
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
        <div className=' bg-fourth h-fit'>
          <div>
            <div className='flex justify-center font-bold text-3xl py-5'>Game Terfavorit</div>
          </div>
          <div className='flex justify-center gap-10'>
            <div className=" card bg-base-100 w-80 mt-14 shadow-2xl">
              <figure className="px-5 pt-5 bg-white">
                <img
                  src="/fifa23.jpg"
                  alt="Shoes"
                  className="rounded-xl" />
              </figure>
              <div className="card-body text-center bg-white">
                <h2 className="card-title text-black">Fifa 23</h2>
                <p className='text-black flex '>
                  adalah game simulasi sepak bola yang dikembangkan oleh EA Sports. Sebagai bagian terbaru dari seri FIFA, game ini menampilkan berbagai mode permainan, termasuk karier, Ultimate Team, dan pertandingan online.
                </p>
                <div className="card-actions px-52 mt-6">
                  {/* <button className="btn btn-primary">Play</button> */}
                </div>
              </div>
            </div>
            <div className=" card bg-base-100 w-80 mt-14 shadow-2xl">
              <figure className="px-5 pt-5 bg-white">
                <img
                  src="/fifa23.jpg"
                  alt="Shoes"
                  className="rounded-xl" />
              </figure>
              <div className="card-body text-center bg-white">
                <h2 className="card-title text-black">Fifa 23</h2>
                <p className='text-black flex '>
                  adalah game simulasi sepak bola yang dikembangkan oleh EA Sports. Sebagai bagian terbaru dari seri FIFA, game ini menampilkan berbagai mode permainan, termasuk karier, Ultimate Team, dan pertandingan online.
                </p>
                <div className="card-actions px-52 mt-6">
                  {/* <button className="btn btn-primary">Play</button> */}
                </div>
              </div>
            </div>
            <div className=" card bg-base-100 w-80 mt-14 shadow-2xl">
              <figure className="px-5 pt-5 bg-white">
                <img
                  src="/fifa23.jpg"
                  alt="Shoes"
                  className="rounded-xl" />
              </figure>
              <div className="card-body text-center bg-white">
                <h2 className="card-title text-black">Fifa 23</h2>
                <p className='text-black flex '>
                  adalah game simulasi sepak bola yang dikembangkan oleh EA Sports. Sebagai bagian terbaru dari seri FIFA, game ini menampilkan berbagai mode permainan, termasuk karier, Ultimate Team, dan pertandingan online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
