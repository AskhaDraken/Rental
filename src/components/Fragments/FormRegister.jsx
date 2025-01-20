"use client"
import { useFormik } from "formik"
import Button from "../Elements/Button"
import InputForm from "../Elements/Input"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

const FormRegister = () => {
    const route = useRouter()
    const formik = useFormik({
        initialValues: {
            username: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: async (values) => {
            event.preventDefault()

            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                const data = await res.json()

                if (res.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: data.message,
                        showConfirmButton: true,

                    }).then((result) => {
                        if(result.isConfirmed) {
                            route.push("/login")
                        }
                    })
                } else {
                    throw new Error(res.error)
                }
            } catch (error) {                
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Already Exist",
                })
            }
        }
    })

    const handleFormikChange = (event) => {
        formik.setFieldValue(event.target.name, event.target.value)
    }


    return (
        <form className="flex flex-col w-full gap-4" action="POST" onSubmit={formik.handleSubmit}>
            <InputForm
                label="Username"
                name="username"
                type="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={handleFormikChange}
            />
            <InputForm
                label="Phone Number"
                name="phone"
                type="phone"
                placeholder="082187897016"
                value={formik.values.phone}
                onChange={handleFormikChange}
            />
            <InputForm
                label="Email"
                type="email"
                name="email"
                placeholder="daniwasahua21@gmail.com"
                value={formik.values.email}
                onChange={handleFormikChange}
            />
            <InputForm
                label="Password"
                type="password"
                name="password"
                placeholder="*********"
                value={formik.values.password}
                onChange={handleFormikChange}
            />
            <InputForm
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="*********"
                value={formik.values.confirmPassword}
                onChange={handleFormikChange}
            />
            <Button type="submit">Create</Button>
        </form>
    )
}

export default FormRegister