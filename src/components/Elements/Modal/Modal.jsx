"use client"    

import { useEffect } from "react"
import { X } from "react-feather"
import { useNavigate } from "react-router-dom"

const ModalLayout = ({ id, className, children, onClick = () => { } }) => {
    // console.log(id);
    const navigate = useNavigate

    const handlelogout = () => {
        navigate('/booking')
    }
    return (
        <dialog className="modal " role="dialog" id={id}>
            <div className={`modal-box max-w-fit ${className}`}>
                <div className="modal-action">
                    {children}
                </div>
                <button onClick={onClick}></button>
                {/* <div className='' onClick={handlelogout}>keluar</div> */}
            </div>
        </dialog>
    )
}

export default ModalLayout