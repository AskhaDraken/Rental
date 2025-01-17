import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Elements/Modal/Modal'
import CardGameAdmin from '@/components/Fragments/Card/Game/CardGameAdmin'
import FormGame from '@/components/Fragments/Form/FormGame'
import { useFetchGame } from '@/features/game'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const GamePage = () => {
  const axiosAuth = useAxiosAuth()
  const query = useSearchParams()
  const [type, setType] = useState("")
  
  const queryParams = {
    value: query.get("value"),
    type: type
  }

  const { data: listGame, isLoading, refetch } = useFetchGame(queryParams)

  useEffect(() => {
    refetch()
  }, [query.get('value'), type])
  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <div className='flex flex-row justify-between w-full'>
          <Button className="btn-info w-fit text-white" onClick={() => document.getElementById("addGame").showModal()}>Tambah Game</Button>
          <select className="select select-bordered w-full max-w-xs" onChange={(event) => { setType(event.target.value) }}>
            <option disabled selected>Filter</option>
            <option>Semua</option>
            {
              isLoading ? <h1>loading</h1> : listGame?.data.filter.map((item, index) => (
                <option key={index}>{item}</option>
              ))
            }
          </select>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {
            listGame?.data.data.map((item, index) => (
              (
                <CardGameAdmin item={item} key={index} />
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