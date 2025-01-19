import Button from "@/components/Elements/Button"
import InputForm from "@/components/Elements/Input"
import SelectInput from "@/components/Elements/SelectInput"
import { useFetchRoom, usePatchRoom, usePostRoom } from "@/features/room"
import { useQueryClient } from "@tanstack/react-query"
import { useFormik } from "formik"
import Swal from "sweetalert2"

const FormRoom = ({ data, type = "create", onClick }) => {
    const queryClient = useQueryClient()
    const { data: listRoom } = useFetchRoom()

    const { mutate: addRoom } = usePostRoom({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.room"] })
            document.getElementById("addRoom").close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Tambah Room",
            })
        },
        onError: () => {
            document.getElementById("addRoom").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Tambah Room",
            })
        }
    })

    const { mutate: updateRoom } = usePatchRoom({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.room"] })
            document.getElementById("editRoom" + data.id).close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Ubah Room",
            })
        },
        onError: () => {
            document.getElementById("addRoom").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Ubah Room",
            })
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            picture: data?.picture || "",
            type: data?.type || "",
            price: data?.price || 0
        },
        onSubmit: (values) => {
            event.preventDefault()

            if (type === "create") {
                addRoom(values)
            } else if (type === "update") {
                updateRoom({
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

    const handleFormikFile = (event) => {
        const formdata = new FormData()

        formdata.append("picture", event.target.files[0])
        formik.setFieldValue(event.target.name, formdata.get("picture"))
    }

    const handleRenderTypePlaystation = () => {
        if (type === "update") {
            return (
                <>
                    <option selected={data.type == "Standart" ? true : false} value="Standart">Standart</option>
                    <option selected={data.type == "VIP" ? true : false} value="VIP">VIP</option>
                </>
            )
        } else if (type === "create") {
            return (
                <>
                    <option selected disabled>Pilih</option>
                    <option>Standart</option>
                    <option>VIP</option>

                </>
            )
        }
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
                <SelectInput name="type" title="Tipe" onChange={handleFormInput}>
                    {handleRenderTypePlaystation()}
                </SelectInput>
                <InputForm
                    name="price"
                    title="Harga"
                    className="w-full"
                    type="number"
                    placeholder="Masukan Harga"
                    required={true}
                    onChange={handleFormInput}
                    value={formik.values.price}
                    isInvalid={formik.errors.price}
                />
            </div>
            <div className="flex gap-4 mt-5">
                <Button className="text-white btn-wide hidden lg:flex btn-error" onClick={onClick}>Cancel</Button>
                <Button className={`lg:btn-wide text-white w-full ${type === "create" ? "btn-info" : "btn-warning"}`} type='submit'>{type === "create" ? "Tambah" : "Ubah"}</Button>
            </div>
        </form>
    )
}

export default FormRoom