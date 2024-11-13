import { useFormik } from "formik"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import InputForm from "../Elements/Input"
import * as yup from "yup"
import Button from "../Elements/Button"
import { jwtDecode } from "jwt-decode"
import { Router } from "react-router-dom"



const FormLogin = () => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            event.preventDefault()
            try {
                
                if (res.ok) {
                    const session = await getSession
            
                    if (session) {
                        const role = jwtDecode(session.user.accessToken).role
            
                        if (role === "customer") {
                            router.push(callbackParams.get('callbackUrl') || '/')
                        } else if (role == "provider") {
                            router.push('/dashboard')
                        } else if (role == "administrator") {
                            router.push('/admin')
                        }
                    }
                } else {
                    throw new Error(res.error)
                }
            }catch (error) {
                setIsLoading(false)
                swal.fire({
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
            <button type="submit">Login</button>
        </form>
    )
}

export default FormLogin