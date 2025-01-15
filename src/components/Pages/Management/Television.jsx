import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Elements/Modal/Modal'
import CardTelevisionAdmin from '@/components/Fragments/Card/Television/CardTelevisionAdmin'
import FormTelevision from '@/components/Fragments/Form/FormTelevision'
import OptionRoom from '@/components/Fragments/Option/OptionRoom'
import { useFetchRoom } from '@/features/room'
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
            <div className="flex flex-col w-full gap-4">
                <div className='flex flex-row justify-between w-full'>
                    <Button className="btn-info w-fit text-white" onClick={() => document.getElementById("addTelevision").showModal()}>Tambah TV</Button>
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Filter</option>
                    
                        {
                            isLoading ? <h1>loading</h1> : listTelevision?.data.filter.map((item, index) => (
                                <OptionRoom key={index} id={item}/>
                            ))
                        }
                    </select>
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