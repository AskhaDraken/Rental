import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import Textarea from '@/components/Elements/Textarea'
import { useFetchGamePublic } from '@/features/game'
import { usePatchRental, usePostRental } from '@/features/rental'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import OptionGame from '../Option/OptionGame'
import Swal from 'sweetalert2'

const FormRental = ({ data, type = "create", onClick }) => {
    const queryClient = useQueryClient()

    const { mutate: addRental } = usePostRental({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.rental"] })
            document.getElementById("addRental").close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Tambah Rental",
            })
        },
        onError: () => {
            document.getElementById("addRental").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Tambah Rental",
            })
        }
    })

    const { mutate: updateRental } = usePatchRental({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.rental"] })
            document.getElementById("updateRental").close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Ubah Rental",
            })
        },
        onError: () => {
            document.getElementById("updateRental").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Ubah Rental",
            })
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            description: data?.description || "",
            alamat: data?.alamat || "",
            mapurl: data?.mapurl || "",
            open: data?.open || "",
            close: data?.close || "",
        },
        onSubmit: (values) => {
            event.preventDefault()

            if (type === "create") {
                addRental(values)
            } else if (type === "update") {
                updateRental({id: data.id, data: values})
            }

        }
    })    

    const handleFormInput = (event) => {
        const { name, value } = event.target
        formik.setFieldValue(name, value)
    }
    return (
        <form className='block w-full space-y-4' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-4'>
                <InputForm onChange={handleFormInput} type="text" value={formik.values.name} title="Name" name="name" />
                {/* <input type="file" name="picture" id="" onChange={handleFormikFile} className='file-input w-full max-w-xs' /> */}
                <Textarea name="description" value={formik.values.description} title="Deskripsi" className="" placeholder="Deskripsi lapangan" onChange={handleFormInput} />
                <InputForm onChange={handleFormInput} type="text" value={formik.values.alamat} title="Alamat" name="alamat" />
                <InputForm onChange={handleFormInput} type="text" value={formik.values.mapurl} title="URL map" name="mapurl" />
                <div className='inline-flex gap-2'>
                    <InputForm onChange={handleFormInput} value={formik.values.open} type="time" title="Open" name="open" />
                    <InputForm onChange={handleFormInput} value={formik.values.close} type="time" title="Close" name="close" />
                </div>
            </div>
            <div className="flex gap-4 mt-5">
                <Button className="text-white btn-wide hidden lg:flex btn-error" onClick={onClick}>Cancel</Button>
                <Button className={`lg:btn-wide text-white w-full ${type === "create" ? "btn-info" : "btn-warning"}`} type='submit'>{type === "create" ? "Tambah" : "Ubah"}</Button>
            </div>
        </form>
    )
}

export default FormRental