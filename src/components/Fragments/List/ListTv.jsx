import { useFetchTv } from '@/features/tv'
import { ToRupiah } from '@/lib/toRupiah'
import React, { useState } from 'react'
import { CheckboxButton } from '../CheckboxButton'
import ListJam from './ListJam'
import { useFormik } from 'formik'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCheckoutTransaksi } from '@/features/transaction'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useOrderStore } from '@/store/orderStore'
import OptionRoom from '../Option/OptionRoom'
import { useSession } from 'next-auth/react'
import { jwtDecode } from 'jwt-decode'
import CardTelevisoion from '../Card/Television/CardTelevision'
import CardTelevision from '../Card/Television/CardTelevision'
import CardTelevisionDetail from '../Card/Television/CardTelevisionDetail'

const ListTv = ({ psId }) => {
    const state = useOrderStore()
    const { data: listTv, isLoading } = useFetchTv(psId)
    const [isSelect, setIsSelect] = useState(false)
    const [position, setPosition] = useState(0)


    const handleClickPosition = (index) => {
        setIsSelect(true)
        setPosition(index)
    }

    // Routing


    return isLoading ? (<span>Loading...</span>) : listTv?.data.data.length > 0 ? (
        <>
            {
                isSelect ? <CardTelevisionDetail item={listTv?.data.data[position]} onClick={() => { setIsSelect(false); state.clearJam([]) }}/> : (
                    <div className='flex flex-col gap-4 items-start'>                        <h1 className='font-bold text-black'>List TV</h1>
                        <select className="select select-bordered w-full max-w-xs text-black">
                            <option disabled selected>Filter</option>

                            {
                                isLoading ? <h1>loading</h1> : listTv?.data.filter.map((item, index) => (
                                    <OptionRoom key={index} id={item} />
                                ))
                            }
                        </select>
                        <div className='grid grid-cols-4 gap-4 '>
                            {
                                listTv?.data.data.map((item, index) => (
                                    !isLoading ? <CardTelevision key={index} item={item} onClick={() => handleClickPosition(index)}/> : <h1>Loading...</h1>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    ) : (
        <h1 className='text-black'>Tidak ada data</h1>
    )
}

export default ListTv