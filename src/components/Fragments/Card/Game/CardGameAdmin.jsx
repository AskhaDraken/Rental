import ModalLayout from '@/components/Elements/Modal/Modal'
import React, { useEffect } from 'react'
import FormGame from '../../Form/FormGame'
import Button from '@/components/Elements/Button'
import { useDeleteGame, useDeleteGameFavorit, usePatchGameFavorit } from '@/features/game'
import { useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { useFetchRental } from '@/features/rental'

const CardGameAdmin = ({ item }) => {
  const queryClient = useQueryClient()
  const { data: rentalFavoritGame, isLoading, refetch } = useFetchRental()

  const { mutate: deleteGame } = useDeleteGame({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch.game"] })
      queryClient.invalidateQueries({ queryKey: ["fetch.game.public"] })
      queryClient.invalidateQueries({ queryKey: ["fetch.game.favorit"] })
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

  const { mutate: addFavorit } = usePatchGameFavorit({
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ["fetch.game"] })
      queryClient.invalidateQueries({ queryKey: ["fetch.game.public"] })
      queryClient.invalidateQueries({ queryKey: ["fetch.game.favorit"] })
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Success Tambah Game ke favorit",
      })
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Tambah Game ke favorit",
      })
    }
  })
  const { mutate: hapusFavorit } = useDeleteGameFavorit({
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ["fetch.game"] })
      queryClient.invalidateQueries({ queryKey: ["fetch.game.public"] })
      queryClient.invalidateQueries({ queryKey: ["fetch.game.favorit"] })
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Success Hapus Game ke favorit",
      })
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Hapus Game ke favorit",
      })
    }
  })

  useEffect(() => {

  }, [])


  return (
    <>
      <div className=" card bg-base-100 w-fit shadow-md border rounded-xl">
        <figure className="px-5 pt-5 bg-white relative" >
          <img
            src={`/upload/${item.picture}`}
            alt="Shoes"
            className="rounded-xl w-full max-w-72" />
          <span className='absolute bottom-4 left-8 bg-third p-2 border border-white rounded'>
            <h1 className='font-semibold text-white'>{item.type}</h1>
          </span>
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title text-black">{item.name}</h2>
          <div className="card-actions justify-end">
            {
              rentalFavoritGame?.data[0].favoritGame.includes(item.id) ? (
                <Button className="text-white btn-error" onClick={() => hapusFavorit({ id: item.id })}>Hapus Favorit</Button>

              ) : (
                <Button className="text-white btn-info" onClick={() => addFavorit({ id: item.id })}>Tambah Favorit</Button>
              )
            }
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