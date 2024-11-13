"use client"
import Autolayout from '../../../components/Layouts/Autolayout'
import FormLogin from '../../../components/Fragments/FormLogin'

const Login = () => {
    return (
        <Autolayout
        title="Login"
        note="Don't have an account?"
        to="/register"
        catatan="Register"
        >
            <FormLogin/>
        </Autolayout>
    )
}

export default Login