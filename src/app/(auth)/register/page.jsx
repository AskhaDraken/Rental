import React from 'react'
import Autolayout from '../../Layouts/Autolayout'
import FormLogin from '../../Fragments/FormLogin'
import FormRegister from '../../Fragments/FormRegister'

const Register = () => {
    return (
        <Autolayout
            title="Register"
            note="you have an account?"
            to="/"
            catatan="Login"
            >
                <FormRegister/>
        </Autolayout>
    )
}

export default Register