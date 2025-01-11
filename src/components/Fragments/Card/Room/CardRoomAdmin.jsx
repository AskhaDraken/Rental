import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Elements/Modal/Modal'
import { useDeleteRoom } from '@/features/room'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import FormRoom from '../../Form/FormRoom'
import Swal from 'sweetalert2'
import { ToRupiah } from '@/lib/toRupiah'

const CardRoomAdmin = ({ item }) => {
    const queryClient = useQueryClient()
    const { mutate: deleteRoom } = useDeleteRoom({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.room"] })
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Hapus Room",
            })
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Hapus Room",
            })
        }
    })
    return (
        <>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <h2 className="card-title">{item.type}</h2>
                    <p>{ToRupiah(item.price)}</p>
                    <div className="card-actions justify-end">
                        <Button className="text-white btn-warning" onClick={() => document.getElementById("editRoom" + item.id).showModal()}>Edit</Button>
                        <Button className="text-white btn-error" onClick={() => deleteRoom(item.id)}>Hapus</Button>
                    </div>
                </div>
            </div>

            <ModalLayout title="Ubah Television" id={"editRoom" + item.id} onClick={() => document.getElementById("editRoom").close}>
                <FormRoom type='update' onClick={() => document.getElementById("editRoom" + item.id).close()} data={item} />
            </ModalLayout>
        </>
    )
}

export default CardRoomAdmin