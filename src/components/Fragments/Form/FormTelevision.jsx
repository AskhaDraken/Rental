import Button from '@/components/Elements/Button'
import InputForm from '@/components/Elements/Input'
import SelectInput from '@/components/Elements/SelectInput'
import Textarea from '@/components/Elements/Textarea'
import { useFetchPlaystation } from '@/features/playstation'
import { useFetchRoom } from '@/features/room'
import { usePatchTv, usePostTv } from '@/features/tv'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import Swal from 'sweetalert2'

const FormTelevision = ({ data, type = "create", onClick }) => {
    const queryClient = useQueryClient()


    const { data: listPlaystation } = useFetchPlaystation()
    const { data: listRoom } = useFetchRoom()
    const { mutate: addTelevision } = usePostTv({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.television"] })
            document.getElementById("addTelevision").close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Tambah TV",
            })
        },
        onError: () => {
            document.getElementById("addTelevision").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Tambah TV",
            })
        }
    })

    const { mutate: updateTelevision } = usePatchTv({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.tv", "fetch.television"] })
            document.getElementById("editTelevision" + data.id).close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Ubah Playstation",
            })
        },
        onError: () => {
            document.getElementById("addTelevision").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Ubah Playstation",
            })
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            description: data?.description || "",
            nomorUrut: data?.nomorUrut || 0,
            psId: data?.psId || "",
            roomId: data?.roomId || "",
        },
        onSubmit: (values) => {
            event.preventDefault()

            if (type === "create") {
                addTelevision(values)
            } else if (type === "update") {
                updateTelevision({
                    id: data.id,
                    data: values
                })
            }

        }
    })



    const handleFormInput = (event) => {
        const { name, value } = event.target
        formik.setFieldValue(name, value)
    }

    const handleRenderTypePlaystation = () => {
        if (type === "update") {
            return listPlaystation?.data.map((item, index) => (
                data.psId == item.id ? <option selected key={index} value={item.id}>{item.type}</option> : <option key={index} value={item.id}>{item.type}</option>
            ))
        } else if (type === "create") {
            return (
                <>
                    <option selected disabled>Pilih</option>
                    {
                        listPlaystation?.data.map((item, index) => (
                            <option key={index} value={item.id}>{item.type}</option>
                        ))
                    }
                </>
            )
        }
    }

    
    const handleRenderRoomTypePlaystation = () => {
        if (type === "update") {
            return listRoom?.data.map((item, index) => (
                data.roomId == item.id ? <option selected key={index} value={item.id}>{item.name}</option> : <option key={index} value={item.id}>{item.name}</option>
            ))
        } else if (type === "create") {
            return (
                <>
                    <option selected disabled>Pilih</option>
                    {
                        listRoom?.data.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </>
            )
        }
    }


    return (
        <form className='block w-full space-y-4' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-4'>
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
                <Textarea value={formik.values.description} name="description" title="Deskripsi" className="w-full" placeholder="Masukan Deskripsi" required={true} onChange={handleFormInput} />
                <InputForm
                    name="nomorUrut"
                    title="Nomor Urut"
                    className="w-full"
                    type="number"
                    placeholder="Masukan Nomor Urutan"
                    required={true}
                    onChange={handleFormInput}
                    value={formik.values.nomorUrut}
                    isInvalid={formik.errors.price}
                />
                <div className='inline-flex gap-4'>
                    <SelectInput name="psId" title="Tipe PS" onChange={handleFormInput}>
                        {handleRenderTypePlaystation()}
                    </SelectInput>
                    <SelectInput name="roomId" title="Tipe Ruangan" onChange={handleFormInput}>
                        {handleRenderRoomTypePlaystation()}
                    </SelectInput>
                </div>
                
            </div>
            <div className="flex gap-4 mt-5">
                <Button className="text-white btn-wide hidden lg:flex btn-error" onClick={onClick}>Cancel</Button>
                <Button className={`lg:btn-wide text-white w-full ${type === "create" ? "btn-info" : "btn-warning"}`} type='submit'>{type === "create" ? "Tambah" : "Ubah"}</Button>
            </div>
        </form>
    )
}

export default FormTelevision