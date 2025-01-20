import { useFormik } from 'formik'
import Button from '@/components/Elements/Button'
import ChangePassword from '@/components/Layouts/Profile/ChangePassword'
import { useStorePublic } from '@/store/storePublic'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosAuth from '@/hooks/useAxiosAuth'
import { toast } from 'react-toastify'
import InputForm from '@/components/Elements/Input'
import EditPhotoProfil from '../EditPhotoProfile'
const FormProfile = ({ state }) => {
    const { isDisable, setDisable } = useStorePublic()
    const queryClient = useQueryClient()

    const axiosAuth = useAxiosAuth()
    const { mutate: updateUser } = useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch(`/api/profil`, body)
        },
        onSuccess: () => {
            setDisable(!isDisable)
            toast.success("Berhasil Update Profile", { style: { backgroundColor: "#00a96e" } })
            queryClient.invalidateQueries({queryKey: ["fetch.user.id"]})
        }
    })

    const formik = useFormik({
        initialValues: {
            fullname: state?.fullname || "",
            email: state?.email || "",
            phone: state?.phone || "",
        },
        onSubmit: async (values) => {
            try {
                updateUser(values)
            } catch (error) {
                console.error(error);
            }
        }
    })

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }


    return (
        <div className='block w-full space-y-4'>
            <div className="flex flex-col items-center text-center gap-4 w-full">
                <EditPhotoProfil state={state?.Profile.picture} />
                <h1 className="font-poppins font-semibold text-xl text-black">{formik.values.fullname}</h1>
            </div>
            <form className='w-full px-4 md:px-0 max-w-2xl' action='' method='patch'>
                <InputForm
                    title="Fullname"
                    name="fullname"
                    label="Fullname"
                    type="text"
                    placeholder="Fullname"
                    value={formik.values.fullname}
                    onChange={handleFormInput}
                    disabled={!isDisable}
                />
                <InputForm
                    title="Phone"
                    name="phone"
                    label="Phone"
                    type="text"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={handleFormInput}
                    disabled={!isDisable}
                />
                <InputForm
                    title="Email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={handleFormInput}
                    disabled={!isDisable}
                />
                <div className='inline-flex gap-4 mt-3'>
                    <Button className={`text-white w-full ${isDisable ? "flex" : "hidden"} btn btn-info`} onClick={() => formik.handleSubmit()}>Save</Button>
                    <Button className={`text-white ${isDisable ? "hidden" : "visible"} btn btn-warning`} onClick={() => setDisable(!isDisable)}>Edit Profile</Button>
                </div>
            </form>
            <ChangePassword />
        </div>
    )
}

export default FormProfile