"use client"

import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Search as SearchIcon } from 'react-feather'

const Search = ({ }) => {
    const query = useSearchParams()
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            value: query.get("value") || ""
        },
        onSubmit: async () => {
            event.preventDefault()
            router.push('?value=' + formik.values.value)
        }
    })

    const handleFormikInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='inline-flex gap-4 pr-4 items-center justify-between bg-secondary w-[50rem] max-w-2xl text-xl rounded-full shadow shadow-white/20 border-4  border-secondary'>
                <div className='bg-white w-full rounded-full px-4 py-2'>
                    <input
                        name='value'
                        type='text'
                        placeholder='Search'
                        className='text-black  w-full outline-none text-lg '
                        value={formik.values.value}
                        onChange={handleFormikInput}
                        // onChange={(event) => {
                        //     router.push('?value='+event.target.value)
                        // }}
                    />
                </div>
                <button type='submit'>
                    <SearchIcon className='cursor-pointer scale-105' color='white' size={32} />
                </button>
            </div>
        </form>
    )
}

export default Search