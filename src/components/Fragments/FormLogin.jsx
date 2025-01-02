"use client"
import { useFormik } from "formik"
import { getSession, signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import InputForm from "../Elements/Input"
import * as yup from "yup"
import Button from "../Elements/Button"
import { jwtDecode } from "jwt-decode"
import Swal from "sweetalert2"


const FormLogin = () => {
    const router = useRouter()
    const callbackParams = useSearchParams()
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
        
                // console.log(res);

                
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
            }catch (error) {
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

    const handleFormikInput = (event) => {
        const { name, value } = event.target
        formik.setFieldValue(name, value)
    }
    return (
        <form onSubmit={formik.handleSubmit} method="post">
            <InputForm
                label="Email"
                type="text"
                name="username"
                placeholder="Email"
                value={formik.values.username}
                onChange={handleFormikInput}
                
            />
            <InputForm
                label="Password"
                type="password"
                name="password"
                placeholder="*********"
                value={formik.values.password}
                onChange={handleFormikInput}
            />
            {/* <Button
                text="Login"
                type="submit"
            /> */}
            <button type="submit" className="bg-secondary rounded-lg h-12 text-white text-2xl font-semibold w-full">Login</button>
        </form>
    )
}

export default FormLogin