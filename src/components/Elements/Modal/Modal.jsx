"use client"

import { useEffect } from "react"
import { X } from "react-feather"
import { useNavigate } from "react-router-dom"

const ModalLayout = ({ id, className, children, onClick = () => { } }) => {

    return (
        <dialog className="modal " role="dialog" id={id}>
            <div className={`modal-box max-w-fit ${className}`}>
                <div className="modal-action">
                    <X className='cursor-pointer absolute text-black flex top-3 justify-end ' onClick={onClick} />

                    {children}
                </div>
                <button onClick={onClick}></button>
                {/* <div className='' onClick={handlelogout}>keluar</div> */}
            </div>
        </dialog>
    )
}

export default ModalLayout