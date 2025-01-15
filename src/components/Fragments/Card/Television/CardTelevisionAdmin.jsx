import Button from '@/components/Elements/Button'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { ToRupiah } from '@/lib/toRupiah'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Swal from 'sweetalert2'
import FormTelevision from '../../Form/FormTelevision'
import ModalLayout from '@/components/Elements/Modal/Modal'
import { useDeleteTv } from '@/features/tv'

const CardTelevisionAdmin = ({ item }) => {
    const queryClient = useQueryClient()
    const { mutate: deleteTelevision } = useDeleteTv({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.television"] })
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Hapus Television",
            })
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Hapus Television",
            })
        }
    })
    return (
        <>
            <div className="card bg-base-100 w-full shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <h2 className="card-title">{item.nomorUrut}</h2>
                    <h3>{item.type}</h3>
                    <p>{item.description}</p>
                    {/* <p>{ToRupiah(item.price)}</p> */}
                    <div className="card-actions justify-end">
                        <Button className="text-white btn-warning" onClick={() => document.getElementById("editTelevision" + item.id).showModal()}>Edit</Button>
                        <Button className="text-white btn-error" onClick={() => deleteTelevision(item.id)}>Hapus</Button>
                    </div>
                </div>
            </div>

            <ModalLayout title="Ubah Television" id={"editTelevision" + item.id} onClick={() => document.getElementById("editTelevision").close}>
                <FormTelevision type='update' onClick={() => document.getElementById("editTelevision" + item.id).close()} data={item} />
            </ModalLayout>
        </>
    )
}

export default CardTelevisionAdmin