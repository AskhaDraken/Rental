import React from 'react'
import Label from './Label'
import Input from './Input'

const InputForm = ({label, name, type, placeholder, value, onChange}) => {
  return (
    <div className='flex flex-col mb-5 '>
        <Label htmlFor={name}>{label}</Label> 
        <Input type={type}  name={name} placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  )
}

export default InputForm