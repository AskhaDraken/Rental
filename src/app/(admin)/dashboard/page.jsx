"use client"
import React, { useState } from 'react'
// import Stik from '../../../../public/layout.png'
import { useSession } from 'next-auth/react'
import ListStat from '@/components/Fragments/List/ListStat'
import ListOrder from '@/components/Fragments/List/ListOrder'
import { useFetchRental } from '@/features/rental'
import ListTransaksi from '@/components/Fragments/List/ListTransaksi'

const Dashboardproviders = () => {

    const { data: session } = useSession()
    const date = new Date()
    const [time, setTime] = useState(date.toLocaleTimeString())

    const { data: rental, isLoading } = useFetchRental()

    console.log(rental?.data.length);



    // const lapanganId = session.user.lapanganId == "" ? localStorage.getItem("aWQ=") : session.user.lapanganId !== "" && localStorage.getItem("aWQ=") !== null ? localStorage.getItem("aWQ=") : session.user.lapanganId

    // const { data: detailLapangan, isLoading } = lapanganId != null ? useFetchByIdLapangan(lapanganId) : ""



    const RenderDashboard = () => {
        if (rental?.data.length > 0) {
            return (
                <div className='flex flex-col w-full h-full'>
                    <div className='inline-flex items-center p-2 justify-start w-full'>
                        <h1 className='font-semibold text-xl text-white'>Hi {session.user.fullname}!</h1>

                        {/* Notification */}
                        {/* <div className='ml-auto hidden md:inline-flex gap-4 items-center justify-center'>
                            <label className='' htmlFor="date">{days[date.getDay() - 1]}</label>
                            <label className='' htmlFor="time">{time}</label>
                        </div> */}
                    </div>
                    <div className='flex flex-row h-full gap-4'>

                        <div className='flex flex-col w-full gap-6'>
                            {/* Statistik */}
                            <ListStat />

                            {/* List Order */}

                            <div className='overflow-y-scroll scroll-smooth no-scrollbar w-full h-full min-h-96 bg-white shadow rounded-md p-4'>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-xl font-semibold text-secondary' htmlFor="">Booking hari ini</label>
                                    <hr />
                                    <ListTransaksi />

                                    {/* <ListOrder id={rental?.data[0].id} token={session.user.token} /> */}
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* <div className='absolute bottom-0 right-0 inline-flex gap-2'>
                        <ButtonBooking />
                        <ButtonScan />
                    </div> */}

                </div>
            )
        } else {
            return <h1>Tidak apa apa</h1>
            // return <EmptyData title="Saat ini anda belum punya lapangan" />
        }
    }

    return (
        <main className='flex flex-col items-center justify-center gap-4 h-full relative'>
            {
                isLoading ? (
                    <>
                        <h1 className='font-extrabold text-4xl text-success tracking-wide'>Loading</h1>
                        <span className="loading loading-spinner text-success loading-lg"></span>
                    </>
                ) : RenderDashboard()
            }
        </main>
    )
}

export default Dashboardproviders