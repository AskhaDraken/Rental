import Button from '@/components/Elements/Button'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { ToRupiah } from '@/lib/toRupiah'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Swal from 'sweetalert2'
import FormPlaystation from '../../Form/FormPlaystation'
import ModalLayout from '@/components/Elements/Modal/Modal'

const CardPlaystationAdmin = ({item}) => {
    const queryClient = useQueryClient()
    const axiosAuth = useAxiosAuth()
    const {mutate: deletePlaystation} = useMutation({
        mutationFn: async () => {
            return await axiosAuth.delete(`/api/playstation?id=${item.id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.playstation"] })
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Hapus Playstation",
            })
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Hapus Playstation",
            })
        }
    })
    return (
        <>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.description}</p>
                    <p>{ToRupiah(item.price)}</p>
                    <div className="card-actions justify-end">
                        <Button className="text-white btn-warning" onClick={() => document.getElementById("editPlaystation" + item.id).showModal()}>Edit</Button>
                        <Button className="text-white btn-error" onClick={() => deletePlaystation()}>Hapus</Button>
                    </div>
                </div>
            </div>

            <ModalLayout title="Ubah Playstation" id={"editPlaystation" + item.id} onClick={() => document.getElementById("addPlaystation").close}>
                <FormPlaystation type='update' onClick={() => document.getElementById("editPlaystation" + item.id   ).close()} data={item}/>
            </ModalLayout>
        </>
    )
}

export default CardPlaystationAdmin