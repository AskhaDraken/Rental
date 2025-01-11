import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Elements/Modal/Modal'
import CardTelevisionAdmin from '@/components/Fragments/Card/Television/CardTelevisionAdmin'
import FormTelevision from '@/components/Fragments/Form/FormTelevision'
import { useFetchTv } from '@/features/tv'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const TelevisionPage = () => {
    const axiosAuth = useAxiosAuth()
    const { data: listTelevision, isLoading } = useQuery({
        queryKey: ["fetch.television"],
        queryFn: async () => {
            return await axiosAuth.get('/api/tv')
        }
    })
    return (
        <>
            <div className="flex flex-col w-fit gap-4">
                <Button className="btn-info w-fit text-white" onClick={() => document.getElementById("addTelevision").showModal()}>Tambah TV</Button>
                <div className="inline-flex gap-8">
                    {
                        Array.from({ length: 3 }).map(() => (
                            <div className="rounded-full p-3 flex items-center justify-center border-2 border-success cursor-pointer hover:scale-105">
                                <h1 className="font-semibold">Standar</h1>
                            </div>
                        ))
                    }
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {
                        listTelevision?.data.map((item, index) => (
                            <CardTelevisionAdmin item={item} key={index} />
                        ))
                    }
                </div>
            </div>
            <ModalLayout title="Tambah Television" id="addTelevision" onClick={() => document.getElementById("addTelevision").close}>
                <FormTelevision type='create' onClick={() => document.getElementById("addTelevision").close()} />
            </ModalLayout>
        </>

    )
}

export default TelevisionPage