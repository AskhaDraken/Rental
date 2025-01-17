import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Elements/Modal/Modal'
import CardTelevisionAdmin from '@/components/Fragments/Card/Television/CardTelevisionAdmin'
import FormTelevision from '@/components/Fragments/Form/FormTelevision'
import OptionPs from '@/components/Fragments/Option/OptionPs'
import OptionRoom from '@/components/Fragments/Option/OptionRoom'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TelevisionPage = () => {
    const axiosAuth = useAxiosAuth()
    const [ps, setPs] = useState("")
    const [room, setRoom] = useState("")

    const { data: listTelevision, isLoading, refetch } = useQuery({
        queryKey: ["fetch.television"],
        queryFn: async () => {
            return await axiosAuth.get(`/api/tv?value=${query.get('value')}&ps=${ps || null}&room=${room || null}`)
        }
    })

    const query = useSearchParams()

    useEffect(() => {
        refetch()
    }, [query.get('value'), ps, room])


    return (
        <>
            <div className="flex flex-col w-full gap-4">
                <div className='flex flex-row justify-between w-full'>
                    <Button className="btn-info w-fit text-white" onClick={() => document.getElementById("addTelevision").showModal()}>Tambah TV</Button>
                    <div className='inline-flex gap-4'>
                        <select className="select select-bordered w-full max-w-xs" onChange={(event) => { setPs(event.target.value) }}>
                            <option disabled selected>Filter</option>
                            <option>Semua</option>

                            {
                                isLoading ? <h1>loading</h1> : listTelevision?.data.filterPs.map((item, index) => (
                                    <OptionPs key={index} id={item} />
                                ))
                            }
                        </select>
                        <select className="select select-bordered w-full max-w-xs" onChange={(event) => { setRoom(event.target.value) }}>
                            <option disabled selected>Filter</option>
                            <option>Semua</option>

                            {
                                isLoading ? <h1>loading</h1> : listTelevision?.data.filterRoom.map((item, index) => (
                                    <OptionRoom key={index} id={item} />
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {
                        listTelevision?.data.data.map((item, index) => (
                            <CardTelevisionAdmin item={item} key={index} />
                        ))
                    }
                </div>
            </div>
            <ModalLayout title="Tambah Television" id="addTelevision" onClick={() => document.getElementById("addPlaystation").close}>
                <FormTelevision type='create' onClick={() => document.getElementById("addTelevision").close()} />
            </ModalLayout>
        </>

    )
}

export default TelevisionPage