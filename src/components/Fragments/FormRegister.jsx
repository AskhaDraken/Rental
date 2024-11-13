import Button from "../Elements/Button"
import InputForm from "../Elements/Input"

const FormRegister = () => {
  return (
        <form action="">
            <InputForm
            label="Username"
            name="username"
            type="username"
            placeholder="Username"
            />
            <InputForm
            label="Phone Number" 
            name="phone" 
            type="phone" 
            placeholder="082187897016"
            />
            <InputForm
            label="Email"
            type="email"
            name="email"
            placeholder="daniwasahua21@gmail.com"
            />
            <InputForm
            label="Password"
            type="password"
            name="password"
            placeholder="*********"
            />
            <InputForm
            label="Confirm Password"
            type="password"
            name="password"
            placeholder="*********"/>
            <Button
            text="Create"
            />
        </form>
    )
}

export default FormRegister