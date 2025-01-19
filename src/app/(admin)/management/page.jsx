'use client'

import React, { useState } from "react";
import ModalLayout from "@/components/Elements/Modal/Modal";
import Button from "@/components/Elements/Button/index.jsx";
import GamePage from "@/components/Pages/Management/Game.jsx";
import PlaystationPage from "@/components/Pages/Management/Playstation.jsx";
import TelevisionPage from "@/components/Pages/Management/Television.jsx";
import Search from "@/components/Fragments/Search/Search.jsx";
import RoomPage from "@/components/Pages/Management/Room.jsx";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth.js";
import FormRental from "@/components/Fragments/Form/FormRental.jsx";
import LayoutManagement from "@/components/Layouts/Management/LayoutManagement.jsx";
import { useFetchRental } from "@/features/rental";


const ManagementPage = () => {

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
            return (
                <LayoutManagement title="Game">
                    <GamePage />
                </LayoutManagement>
            )
        } else if (filter === "playstation") {
            return (
                <LayoutManagement title="Playstation">
                    <PlaystationPage />
                </LayoutManagement>
            )
        } else if (filter === "television") {
            return (
                <LayoutManagement title="Television">
                    <TelevisionPage />
                </LayoutManagement>
            )
        } else if (filter === "room") {
            return (
                <LayoutManagement title="Room">
                    <RoomPage />
                </LayoutManagement>
            )
        } else {
            return (
                <LayoutManagement title="Game">
                    <GamePage />
                </LayoutManagement>
            )
        }
    }

    const axiosAuth = useAxiosAuth()
    const { data: rental, isLoading } = useQuery({
        queryKey: ['fetch.rental'],
        queryFn: async () => {
            return await axiosAuth.get('/api/rental')
        }
    })

    console.log(rental);


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
                        <FormRental data={rental?.data[0]} onClick={() => document.getElementById("addRental").close()} />
                    </ModalLayout>
                </>
            )
        }
    }
    return (
        <>
            <div className="flex flex-col w-full h-full gap-8">
                <div className="inline-flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Management</h1>
                    <Button className="btn-warning text-white" onClick={() => document.getElementById("updateRental").showModal()}>Edit</Button>
                </div>
                {handleManagement()}
            </div>
            <ModalLayout id="updateRental" title="Edit Rental" onClick={() => document.getElementById("updateRental").close()}>
                {isLoading ? <h1>Loading</h1> : <FormRental data={rental?.data[0]} type="update" onClick={() => document.getElementById("updateRental").close()} />}
            </ModalLayout>
        </>
    )
}

export default ManagementPage