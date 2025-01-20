import { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { useFormik } from 'formik'
import Button from '@/components/Elements/Button'
import ModalLayout from '../Elements/Modal/Modal'
import { usePatchProfileImage } from '@/features/profil'
import Swal from 'sweetalert2'
import { useQueryClient } from '@tanstack/react-query'

const EditPhotoProfil = ({ state }) => {
  const [isOpen, setOpen] = useState(false)
  const [imgCrop, setImgCrop] = useState(state)
  const [storeImage, setStoreImage] = useState([])

  const queryClient = useQueryClient()

  const onCrop = (view) => {
    setImgCrop(view)
  }

  const onClose = () => {
    setImgCrop(null)
  }

  const { mutate: uploadImage, status } = usePatchProfileImage({
    onSuccess: () => {
      setOpen(false)
      document.getElementById('changeImage').close()
      queryClient.invalidateQueries({ queryKey: ["fetch.user.id"] })
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Success Upload Photo",
      })
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal Upload",
      })
    }
  })

  const saveImage = async () => {

    try {
      const formData = new FormData()
      formData.append("picture", imgCrop.data)
      setStoreImage([...storeImage, { imgCrop }])
      uploadImage({ picture: imgCrop })
    } catch (error) {
      console.error(error);
    }

  }

  const formik = useFormik({
    initialValues: {
      image: storeImage
    },
    onSubmit: async () => {
      try {
        const formData = new FormData()
        formData.append("file", formik.values.image)
        setOpen(false)
      } catch (error) {
        console.error(error);
      }
    }
  })


  return (
    <div className='m-5 w-fit flex justify-center cursor-pointer hover:scale-[101%]'>
      <div>
        <img
          className='w-64 h-64 rounded-full object-cover '
          src={imgCrop != null ? imgCrop : '/emptyUser.png'}
          onClick={() => document.getElementById('changeImage').showModal()}
        />
        <ModalLayout id='changeImage' title="Ubah Photo" >
          <div className='block space-y-4'>
            <Avatar width={500} height={295} onClose={onClose} onCrop={onCrop} onImageLoad={(e) => { console.log(e.target); }} />
            <button className={`btn text-white btn-success btn-wide ${status === "pending" ? "btn-disabled" : ""} `} type='submit' onClick={() => saveImage()}>
                    {
                        status === "pending" ? <span className="loading loading-dots loading-lg"></span> : <h1 className='font-semibold text-base'>Pesan Sekarang</h1>
                    }
                </button>
          </div>
        </ModalLayout>
      </div>
    </div>
  )
}

export default EditPhotoProfil