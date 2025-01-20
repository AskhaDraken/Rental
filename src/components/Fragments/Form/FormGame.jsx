import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import Textarea from '@/components/Elements/Textarea'
import { usePatchGame, usePostGame } from '@/features/game'
import { useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import Swal from 'sweetalert2'

const FormGame = ({ data, type = "create", onClick }) => {
    const queryClient = useQueryClient()


    const { mutate: addGame } = usePostGame({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.game"] })
            document.getElementById("addGame").close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Tambah Game",
            })
        },
        onError: () => {
            document.getElementById("addGame").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Tambah Game",
            })
        }
    })

    const { mutate: updateGame } = usePatchGame({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.game"] })
            document.getElementById("editGame" + data.id).close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Ubah Game",
            })
        },
        onError: () => {
            document.getElementById("editGame").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Ubah Game",
            })
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            picture: data?.picture || "",
            description: data?.description || "",
            type: data?.type || "",

        },
        onSubmit: (values) => {
            event.preventDefault()

            if (type === "create") {
                addGame(values)
            } else if (type === "update") {
                updateGame({
                    id: data.id,
                    data: values
                })
            }
        },
        
    })

    const handleFormInput = (event) => {
        const { name, value } = event.target
        formik.setFieldValue(name, value)
    }

    const handleFormikFile = (event) => {
        const formdata = new FormData()

        formdata.append("picture", event.target.files[0])        
        
        formik.setFieldValue(event.target.name, formdata.get("picture"))
    }

    return (
        <form className='block w-full space-y-4' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-4'>
                <input type="file" name="picture" id="" onChange={handleFormikFile} className='file-input w-full max-w-xs' />
                <InputForm
                    name="name"
                    title="Nama Playstation"
                    className="w-full"
                    type="text"
                    placeholder="Masukan nama"
                    required={true}
                    onChange={handleFormInput}
                    value={formik.values.name}
                    isInvalid={formik.errors.name}
                />
                <Textarea name="description" value={formik.values.description} title="Deskripsi" className="w-full" placeholder="Masukan Deskripsi" required={true} onChange={handleFormInput} />
                <select name='type' className="select select-bordered w-full max-w-xs" onChange={handleFormInput}>
                    <option disabled selected>Filter</option>
                    <option>PS1</option>
                    <option>PS2</option>
                    <option>PS3</option>
                    <option>PS4</option>
                    <option>PS5</option>
                </select>
            </div>
            <div className="flex gap-4 mt-5">
                <Button className="text-white btn-wide hidden lg:flex btn-error" onClick={onClick}>Cancel</Button>
                <Button className={`lg:btn-wide text-white w-full ${type === "create" ? "btn-info" : "btn-warning"}`} type='submit'>{type === "create" ? "Tambah" : "Ubah"}</Button>
            </div>
        </form>
    )
}

export default FormGame