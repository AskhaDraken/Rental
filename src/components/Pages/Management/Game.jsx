import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Elements/Modal/Modal'
import CardGameAdmin from '@/components/Fragments/Card/Game/CardGameAdmin'
import FormGame from '@/components/Fragments/Form/FormGame'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const GamePage = () => {
  const axiosAuth = useAxiosAuth()
  const { data: listGame, isLoading } = useQuery({
    queryKey: ["fetch.game"],
    queryFn: async () => {
      return await axiosAuth.get('/api/game')
    }
  })
  return (
    <>
      <div className="flex flex-col w-fit gap-4">
        <Button className="btn-info w-fit text-white" onClick={() => document.getElementById("addGame").showModal()}>Tambah Game</Button>
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
            listGame?.data.map((item, index) => (
              (
                <CardGameAdmin item={item} key={index}/>
              )
            ))
          }
        </div>
      </div>
      <ModalLayout title="Tambah Game" id="addGame" onClick={() => document.getElementById("addGame").close}>
        <FormGame type='create' onClick={() => document.getElementById("addGame").close()} />
      </ModalLayout>
    </>

  )
}

export default GamePage