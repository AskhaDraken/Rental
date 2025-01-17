"use client"

import { jwtDecode } from "jwt-decode"
import { useSession } from "next-auth/react"
import { useState } from "react"

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// Gambar
import Spider from '../../../../public/spiderman.jpg'
import Assasin from '../../../../public/Assasin.png'
import Fifa from "../../../../public/fifa23.jpg"
import RedDead from "../../../../public/red dead.jpg"
import Uncharted from "../../../../public/Unchartad.png"
import Witcher from "../../../../public/witcher.jpg"
import { IoSearchOutline } from "react-icons/io5"
import { Textarea } from "@mui/joy"
import LikeButton from "@/components/LikeButton";
import ModalLayout from "@/components/Elements/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

const GamePage = () => {
    // const CardGame = [
    //     {
    //         gambar: '/spiderman.jpg',
    //         nama: 'Spiderman',
    //         order: 'lorem ipsum dolor sit amet',
    //     },
    //     {
    //         gambar: 'fifa23.jpg',
    //         nama: "Fifa23",
    //         order: 'lorem ipsum dolor sit amet',
    //     },
    //     {
    //         gambar: '/red dead.jpg',
    //         nama: "Red Dead Redemption 2",
    //         order: 'lorem ipsum dolor sit amet',
    //     },
    //     {
    //         gambar: '/mortal kombat.jpg',
    //         nama: "Mortal Kombat 10",
    //         order: 'lorem ipsum dolor sit amet',
    //     },
    //     {
    //         gambar: '/TLOU.jpg',
    //         nama: "The Last Of Us",
    //         order: 'lorem ipsum dolor sit amet',
    //     },
    //     {
    //         gambar: '/gta.jpg',
    //         nama: "Grand Theft Auto V",
    //         order: 'lorem ipsum dolor sit amet',
    //     },
    //     {
    //         gambar: '/witcher.jpg',
    //         nama: "Witcher 3",
    //         order: 'lorem ipsum dolor sit amet',
    //     },

    // ]

    // const { data: session } = useSession()
    // const [isOpen, setIsOpen] = useState(false);



    // if (session) {
    //     const role = jwtDecode(session.user.token).role

    //     if (role === "user") {
    //         return (

    //             <section className='container mx-auto bg-white p-16' >
    //                 <div className="flex flex-col items-center gap-8">
    //                     <h1 className="font-bold text-3xl">Daftar Game</h1>
    //                     <div className="grid grid-cols-4 gap-4 ">
    //                         {
    //                             CardGame.map((CardGame, index) => {
    //                                 return (
    //                                     <div className=" card bg-base-100 w-full shadow-md border rounded-xl" key={index}>
    //                                         <figure className="px-5 pt-5 bg-white" >
    //                                             <img
    //                                                 src={CardGame.gambar}
    //                                                 alt="Shoes"
    //                                                 className="rounded-xl" />
    //                                         </figure>
    //                                         <div className="card-body text-center bg-white">
    //                                             <h2 className="card-title text-black">{CardGame.nama}</h2>
    //                                             <p className='text-black flex '>
    //                                                 {CardGame.order}
    //                                             </p>
    //                                         </div>
    //                                     </div>
    //                                 )
    //                             })
    //                         }
    //                     </div>
    //                 </div>
    //             </section>
    //         )
    //     } else if (role === "admin") {

    //         const game = [
    //             {
    //                 gambar: Spider,
    //                 nama: "Spider Man",
    //                 order: "Marvel's Spider-Man adalah game aksi-petualangan orang ketiga dunia terbuka, di mana pemain mengontrol Peter Parker , dengan identitas pahlawan supernya Spider-Man, melalui Manhattan, New York City untuk memerangi kejahatan."
    //             },
    //             {
    //                 gambar: Assasin,
    //                 nama: "Assasin Mirage",
    //                 order: "Dalam Assassin’s Creed: Mirage, pemain akan terlibat dalam narasi yang mendalam.Cerita yang kompleks ini menggabungkan sejarah dunia nyata dengan elemen fiksi yang menarik, dan pengaruh Islam menjadi katalisator penting dalam pengembangan cerita tersebut."
    //             },
    //             {
    //                 gambar: Fifa,
    //                 nama: "Fifa 23",
    //                 order: "FIFA 23 adalah game simulasi sepak bola, yang terbaru dari seri yang sudah berjalan lama, yang dikembangkan dan diterbitkan oleh Electronic Arts. Dalam FIFA 23, pemain dapat mengoper, mengumpan, menembak, menekel, dan menggiring bola dengan menekan tombol joypad yang sederhana, sambil berusaha menguasai trik yang lebih kompleks dan manuver taktis."
    //             },
    //             {
    //                 gambar: RedDead,
    //                 nama: "RDR 2",
    //                 order: "Red Dead Redemption 2 adalah permainan video aksi-penjelajahan tahun 2018 yang dikembangkan dan diterbitkan oleh Rockstar Games. Game ini adalah entri ketiga dalam seri Red Dead dan merupakan prekuel dari game Red Dead Redemption tahun 2010."
    //             },
    //             {
    //                 gambar: Uncharted,
    //                 nama: "Uncharted 4",
    //                 order: "Uncharted 4 adalah game aksi-petualangan yang dikembangkan oleh Naughty Dog dan dirilis pada Mei 2016 untuk PlayStation 4"
    //             },
    //             {
    //                 gambar: Witcher,
    //                 nama: "The Witcher III",
    //                 order: "The Witcher 3: Wild Hunt adalah action role-playing game dikembangkan dan diterbitkan oleh Polish pengembang CD Projekt Red dan didasarkan pada The Witcher seri novel fantasi yang ditulis oleh Andrzej Sapkowski."
    //             },
    //         ]
    //         return (
    //             <div className='grid justify-center p-20 w-full h-fit py-6 overflow-y bg-background overflow-y-scroll font-body'>
    //                 <div className='flex justify-between mr-'>
    //                     <h1 h1 className='bg-gradient-to-r from-white via-purple-950 to-purple-950 text-transparent w-full bg-clip-text text-3xl font-bold'>
    //                         List Tv Rental
    //                     </h1>
    //                     <div className='flex w-[30rem] h-11 p-2 rounded-full items-center justify-between bg-transparent border-white border'>
    //                         <input
    //                             className='w-full bg-transparent text-lg outline-none text-white p-2'
    //                             placeholder='Search'
    //                         />
    //                         <div className='w-12 bg-gradient-to-r from-birutua to-ungu hover:from-ungu flex justify-center p-1 border border-white rounded-full cursor-pointer'>
    //                             <IoSearchOutline size={20} className=' text-white ' />
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className='bg-purple-800 w-fit p-2 rounded-lg m-1 translate-y-10 translate-x-0 text-black'>
    //                     {/* {Button} */}
    //                     <button className='text-white' onClick={() => document.getElementById("addGame").showModal()}>+ Add Game</button>
    //                 </div>
    //                 {/* Modal */}
    //                 <ModalLayout id="addGame" className='bg-white' onClick={() => document.getElementById("addGame").close()}>
    //                     <form className='flex flex-col' method="dialog">
    //                         <div className='flex'>
    //                             <h3 className="font-bold text-lg">Game Form</h3>
    //                         </div>
    //                         <div className='grid grid-row gap-10 mt-5'>
    //                             <Textarea
    //                                 name="Neutral"
    //                                 placeholder="Nama PS"
    //                                 variant="outlined"
    //                                 color="neutral"
    //                             />
    //                             <Textarea
    //                                 name="Soft"
    //                                 placeholder="Deskripsi PS"
    //                                 variant="soft"
    //                             />
    //                             <FormControl fullWidth>
    //                                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
    //                                     Tipe
    //                                 </InputLabel>
    //                                 <NativeSelect
    //                                     defaultValue={30}
    //                                     inputProps={{
    //                                         name: 'Tipe',
    //                                         id: 'uncontrolled-native',
    //                                     }}
    //                                 >
    //                                     <option value={10}>PS2</option>
    //                                     <option value={20}>PS3</option>
    //                                     <option value={30}>PS4</option>
    //                                     <option value={30}>PS5</option>
    //                                 </NativeSelect>
    //                             </FormControl>
    //                             <FormControl fullWidth>
    //                                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
    //                                     Harga
    //                                 </InputLabel>
    //                                 <NativeSelect
    //                                     defaultValue={30}
    //                                     inputProps={{
    //                                         name: 'Harga',
    //                                         id: 'uncontrolled-native',
    //                                     }}
    //                                 >
    //                                     <option value={10}>Rp 5000</option>
    //                                     <option value={20}>Rp 10000</option>
    //                                     <option value={30}>Rp 15000</option>
    //                                     <option value={30}>Rp 20000</option>
    //                                 </NativeSelect>
    //                             </FormControl>
    //                         </div>
    //                         <div className="mt-5">
    //                             <button className="bg-purple-800 w-full rounded-md mt-2 text-white p-2">Add</button>
    //                         </div>
    //                     </form>
    //                 </ModalLayout>
    //                 <div className='grid grid-cols-3 gap-10 mt-14'>
    //                     {
    //                         game.map((game, index) => {
    //                             return (
    //                                 <div className="card bg-white w-80 h-200" key={index}>
    //                                     <figure>
    //                                         <img
    //                                             src={game.gambar}
    //                                             alt="" />
    //                                     </figure>
    //                                     <div className="card-body ">
    //                                         <div className='flex justify-between items-start'>
    //                                             <h2 className="card-title poppins-medium">{game.nama}</h2>
    //                                             <LikeButton />
    //                                         </div>
    //                                         <p id='descOrder' className="">{game.order}</p>
    //                                     </div>
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </div>
    //             </div>

    //         )
    //     } 
    // } else {
    //     return (

    //         <section className='container mx-auto bg-white p-16' >
    //             <div className="flex flex-col items-center gap-8">
    //                 <h1 className="font-bold text-3xl">Daftar Game</h1>
    //                 <div className="grid grid-cols-4 gap-4 ">
    //                     {
    //                         CardGame.map((CardGame, index) => {
    //                             return (
    //                                 <div className=" card bg-base-100 w-full shadow-md border rounded-xl" key={index}>
    //                                     <figure className="px-5 pt-5 bg-white" >
    //                                         <img
    //                                             src={CardGame.gambar}
    //                                             alt="Shoes"
    //                                             className="rounded-xl" />
    //                                     </figure>
    //                                     <div className="card-body text-center bg-white">
    //                                         <h2 className="card-title text-black">{CardGame.nama}</h2>
    //                                         <p className='text-black flex '>
    //                                             {CardGame.order}
    //                                         </p>
    //                                     </div>
    //                                 </div>
    //                             )
    //                         })
    //                     }
    //                 </div>
    //             </div>
    //         </section>
    //     )
    // }
    // const { data: listGame, isLoading   } = useQuery({
    //     queryKey: ["fetch.game.user"],
    //     queryFn: async () => {
    //         return await axios.get('/api/game')
    //     }
    // })

    // console.log(listGame?.data);
    

    return (
        <></>
    )

}

export default GamePage