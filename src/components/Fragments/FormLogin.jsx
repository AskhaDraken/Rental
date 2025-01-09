"use client"
import { useFormik } from "formik"
import { getSession, signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import InputForm from "../Elements/Input"
import * as yup from "yup"
import Button from "../Elements/Button"
import { jwtDecode } from "jwt-decode"
import Swal from "sweetalert2"
import { useState } from "react"


const FormLogin = () => {
    const router = useRouter()
    const callbackParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            event.preventDefault()

            try {
                const res = await signIn('credentials', {
                    redirect: false,
                    username: values.username,
                    password: values.password,
                    // callbackUrl: callbackParams.get('callbackUrl')
                })



                if (res.ok) {
                    const session = await getSession()

                    if (session) {
                        const role = jwtDecode(session.user.token).role

                        if (role === "user") {
                            router.push('/')
                            // router.push(callbackParams.get('callbackUrl') || '/')
                        } else if (role == "admin") {
                            router.push('/dashboard')
                        }
                    }
                } else {
                    throw new Error(res.error)
                }
            } catch (error) {
                // setIsLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email atau Password salah"
                })
            }
        },
        validationSchema: yup.object().shape({
            user: yup.string(),
            password: yup.string().min(8, "Password minimal 8 karakter")
        }),
        onReset: () => {
            formik.setFieldValue("user", "")
            formik.setFieldValue("password", "")
        }
    })

    const handleFormInput = (event) => {
        const { name, value } = event.target
        formik.setFieldValue(name, value)
    }
    return (
        <form onSubmit={formik.handleSubmit} method="post">
            <div className="flex flex-col w-full gap-4">
                <InputForm
                    name="username"
                    title="Email / Nomor Hp"
                    className="w-full"
                    type="text"
                    placeholder="Email atau Nomor HP"
                    required={true}
                    onChange={handleFormInput}
                    value={formik.values.email}
                    isInvalid={formik.errors.email}
                />
                <InputForm
                    name="password"
                    title="Password"
                    className="w-full"
                    type="password"
                    placeholder="Password"
                    required={true}
                    onChange={handleFormInput}
                    value={formik.values.password}
                    isInvalid={formik.errors.password}
                />
                <Button className={` bg-fourth text-white w-full rounded-md border-none ${isLoading ? "btn-disabled" : ""}`} type="submit">{isLoading ? handleLoading() : "Login"}</Button>
            </div>
        </form>
    )
}

export default FormLogin