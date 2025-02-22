import Button from "@/components/Elements/Button"
import InputForm from "@/components/Elements/Input"
import SelectInput from "@/components/Elements/SelectInput"
import Textarea from "@/components/Elements/Textarea"
import { useFetchPlaystation, usePatchPlaystation, usePostPlaystation } from "@/features/playstation"
import { usePostRental } from "@/features/rental"
import { useQueryClient } from "@tanstack/react-query"
import { useFormik } from "formik"
import Swal from "sweetalert2"

const FormPlaystation = ({ data, type = "create", onClick }) => {
    const queryClient = useQueryClient()


    const { mutate: addPlaystation } = usePostPlaystation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.playstation"] })
            document.getElementById("addPlaystation").close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Tambah Playstation",
            })
        },
        onError: () => {
            document.getElementById("addPlaystation").close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal Tambah Playstation",
            })
        }
    })

    const { mutate: updatePlaystation } = usePatchPlaystation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch.playstation"] })
            document.getElementById("editPlaystation" + data.id).close()
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Success Ubah Playstation",
            })
        },
        onError: () => {
            document.getElementById("editPlaystation").close()
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
            type: data?.type || "",
            price: data?.price || 0
        },
        onSubmit: (values) => {
            event.preventDefault()

            if (type === "create") {
                addPlaystation(values)
            } else if (type === "update") {
                updatePlaystation({
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
            return (
                <>
                    <option selected={data.type == "PS1" ? true : false}>PS1</option>
                    <option selected={data.type == "PS2" ? true : false}>PS2</option>
                    <option selected={data.type == "PS3" ? true : false}>PS3</option>
                    <option selected={data.type == "PS4" ? true : false}>PS4</option>
                    <option selected={data.type == "PS5" ? true : false}>PS5</option>
                </>
            )
        } else if (type === "create") {
            return (
                <>
                    <option selected disabled>Pilih</option>
                    <option>PS1</option>
                    <option>PS2</option>
                    <option>PS3</option>
                    <option>PS4</option>
                    <option>PS5</option>
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
                <Textarea name="description" value={formik.values.description} title="Deskripsi" className="w-full" placeholder="Masukan Deskripsi" required={true} onChange={handleFormInput} />
                <SelectInput name="type" title="Tipe PS" onChange={handleFormInput}>
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

export default FormPlaystation