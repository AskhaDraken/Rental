import Button from '@/components/Elements/Button'
import React from 'react'
import { Key } from 'react-feather'
import FormUbahPassword from '@/components/Fragments/Form/FormUbahPassword'
import ModalLayout from '@/components/Elements/Modal/Modal'

const ChangePassword = () => {
  return (
    <div>
      <Button className="text-white btn btn-info" onClick={() => document.getElementById("changePassword").showModal()}>
        <Key />Ubah Password</Button>
      <ModalLayout id="changePassword" title="Ubah Password" onClick={() => document.getElementById("changePassword").close()}>
        <FormUbahPassword />
      </ModalLayout>
    </div>
  )
}

export default ChangePassword