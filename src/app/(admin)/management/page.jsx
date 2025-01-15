'use client'

import React, { useState } from "react";
import Textarea from '@mui/joy/Textarea';
// import ImageUpload from '../../components/Elements/ImageUpload/FileInput'
import LikeButton from '../../../components/LikeButton.jsx'
import Spider from '../../../../public/spiderman.jpg'
import Assasin from '../../../../public/Assasin.png'
import Fifa from "../../../../public/fifa23.jpg"
import RedDead from "../../../../public/red dead.jpg"
import Uncharted from "../../../../public/Unchartad.png"
import Witcher from "../../../../public/witcher.jpg"
import ModalLayout from "@/components/Elements/Modal/Modal";
import { IoSearchOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import FormGame from "@/components/Fragments/Form/FormGame.jsx";
import Button from "@/components/Elements/Button/index.jsx";
import GamePage from "@/components/Pages/Management/Game.jsx";
import PlaystationPage from "@/components/Pages/Management/Playstation.jsx";
import TelevisionPage from "@/components/Pages/Management/Television.jsx";
import Search from "@/components/Fragments/Search/Search.jsx";
import RoomPage from "@/components/Pages/Management/Room.jsx";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth.js";
import FormRental from "@/components/Fragments/Form/FormRental.jsx";


const Gameproviders = () => {

    const [isOpen, setIsOpen] = useState(false);

    const game = [
        {
            gambar: Spider,
            nama: "Spider Man",
            order: "Marvel's Spider-Man adalah game aksi-petualangan orang ketiga dunia terbuka, di mana pemain mengontrol Peter Parker , dengan identitas pahlawan supernya Spider-Man, melalui Manhattan, New York City untuk memerangi kejahatan."
        },
        {
            gambar: Assasin,
            nama: "Assasin Mirage",
            order: "Dalam Assassin’s Creed: Mirage, pemain akan terlibat dalam narasi yang mendalam.Cerita yang kompleks ini menggabungkan sejarah dunia nyata dengan elemen fiksi yang menarik, dan pengaruh Islam menjadi katalisator penting dalam pengembangan cerita tersebut."
        },
        {
            gambar: Fifa,
            nama: "Fifa 23",
            order: "FIFA 23 adalah game simulasi sepak bola, yang terbaru dari seri yang sudah berjalan lama, yang dikembangkan dan diterbitkan oleh Electronic Arts. Dalam FIFA 23, pemain dapat mengoper, mengumpan, menembak, menekel, dan menggiring bola dengan menekan tombol joypad yang sederhana, sambil berusaha menguasai trik yang lebih kompleks dan manuver taktis."
        },
        {
            gambar: RedDead,
            nama: "RDR 2",
            order: "Red Dead Redemption 2 adalah permainan video aksi-penjelajahan tahun 2018 yang dikembangkan dan diterbitkan oleh Rockstar Games. Game ini adalah entri ketiga dalam seri Red Dead dan merupakan prekuel dari game Red Dead Redemption tahun 2010."
        },
        {
            gambar: Uncharted,
            nama: "Uncharted 4",
            order: "Uncharted 4 adalah game aksi-petualangan yang dikembangkan oleh Naughty Dog dan dirilis pada Mei 2016 untuk PlayStation 4"
        },
        {
            gambar: Witcher,
            nama: "The Witcher III",
            order: "The Witcher 3: Wild Hunt adalah action role-playing game dikembangkan dan diterbitkan oleh Polish pengembang CD Projekt Red dan didasarkan pada The Witcher seri novel fantasi yang ditulis oleh Andrzej Sapkowski."
        },
    ]

    const filterPage = [
        {
            title: "Game",
            value: "game"
        },
        {
            title: "Playstation",
            value: "playstation"
        },
        {
            title: "Television",
            value: "television"
        },
        {
            title: "Room",
            value: "room"
        },
    ]

    const [filter, setFilter] = useState("game")

    const renderFilter = () => {
        if (filter === "game") {
            return <GamePage />
        } else if (filter === "playstation") {
            return <PlaystationPage />
        } else if (filter === "television") {
            return <TelevisionPage />
        } else if (filter === "room") {
            return <RoomPage />
        } else {
            return <GamePage />
        }
    }

    const axiosAuth = useAxiosAuth()
    const { data: rental, isLoading } = useQuery({
        queryKey: ['fetch.rental'],
        queryFn: async () => {
            return await axiosAuth.get('/api/rental')
        }
    })

    const handleManagement = () => {
        if (rental?.data.length > 0) {
            return (
                <div className="flex flex-col w-full h-full gap-8">
                    <div className="inline-flex justify-between items-center">
                        {/* Filter */}
                        <div className="inline-flex gap-8">
                            {
                                filterPage.map((item, index) => (
                                    <div key={index} className="rounded-md p-3 flex items-center justify-center border border-white bg-secondary cursor-pointer hover:scale-105" onClick={() => setFilter(item.value)}>
                                        <h1 className="font-medium text-white">{item.title}</h1>
                                    </div>
                                ))
                            }
                        </div>
                        <Search />
                    </div>
                    {renderFilter()}
                </div>
            )
        } else {
            return (
                <>
                    <Button className="btn-success text-white w-fit" onClick={() => document.getElementById("addRental").showModal()}>Tambah Rental</Button>
                    <ModalLayout id="addRental" title="Tambah Rental" onClick={() => document.getElementById("addRental").close()}>
                        <FormRental data={rental?.data} onClick={() => document.getElementById("addRental").close()}/>
                    </ModalLayout>
                </>
            )
        }
    }
    return (

        <div className="flex flex-col w-full h-full gap-8">

            <h1 className="text-2xl font-bold text-white">Management</h1>
            {handleManagement()}

        </div>
    )
}

export default Gameproviders