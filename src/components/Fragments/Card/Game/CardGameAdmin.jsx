import ModalLayout from '@/components/Elements/Modal/Modal'
import React from 'react'
import FormGame from '../../Form/FormGame'
import Button from '@/components/Elements/Button'
import { useDeleteGame } from '@/features/game'
import { useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

const CardGameAdmin = ({ item }) => {
  const queryClient = useQueryClient()
  const { mutate: deleteGame } = useDeleteGame({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch.game"] })
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Success Hapus Game",
      })
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Hapus Game",
      })
    }
  })
  return (
    <>
      <div className=" card bg-base-100 w-full shadow-md border rounded-xl">
        <figure className="px-5 pt-5 bg-white" >
          {/* <img
          src={CardGame.gambar}
          alt="Shoes"
          className="rounded-xl" /> */}
        </figure>
        <div className="card-body text-center bg-white">
          <h2 className="card-title text-black">{item.name}</h2>
          <p className='text-black flex '>
            {item.description}
          </p>
          <div className="card-actions justify-end">
            <Button className="text-white btn-warning" onClick={() => document.getElementById("editGame" + item.id).showModal()}>Edit</Button>
            <Button className="text-white btn-error" onClick={() => deleteGame(item.id)}>Hapus</Button>
          </div>
        </div>
      </div>
      <ModalLayout title="Ubah Game" id={"editGame" + item.id} onClick={() => document.getElementById("editGame").close}>
        <FormGame type='update' onClick={() => document.getElementById("editGame" + item.id).close()} data={item} />
      </ModalLayout>
    </>
  )
}

export default CardGameAdmin