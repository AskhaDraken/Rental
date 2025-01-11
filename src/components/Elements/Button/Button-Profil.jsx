import React, { useState } from "react";
import Textarea from '@mui/joy/Textarea';
import Modal from '../../../components/Elements/Modal/Modal.jsx'
import Photo from "../../../../public/Photo.jpeg";
import Avatar from '../../../components/Elements/UploadAvatar/Avatar.jsx';
import { usePostLogout } from "@/features/auth.js";

const ButtonProfil = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { toggle } = props;

  return (
    <>
      <div

        className={`dropdown dropdown-right dropdown-end w-fit h-center bottom-4 absolute transition-all flex ${toggle
          ? "flex bg-white rounded-xl p-3 items-center justify-center gap-x-3"
          : "gap-y-2 duration-300 delay-300 flex flex-col items-center"
          }`}
      >
        <div className={`btn btn-ghost ${toggle ? "" : "p-0"}`} tabIndex={0}>
          <div className="min-w-12 h-12">
            <img
              src={Photo}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className={toggle ? "" : "hidden delay-300"}>
            <h3 className="text-lg text-black">Gor Putra Bone</h3>
            <span className="text-xs opacity-60 text-black">Admin</span>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 translate-x-2 shadow-2xl"
        >
          <li>
            <button className="text-lg text-black" onClick={() => setIsOpen(true)}>Edit Profil</button>
          </li>
          <li>
            <a href="" className="text-lg text-black">
              Ubah Password
            </a>
          </li>
          <li>
            <button onClick={usePostLogout} className="text-lg text-red-600">
              Keluar
            </button>
          </li>
        </ul>
      </div>
      <Modal className="bg-editprofil w-fit" open={isOpen} onClick={() => setIsOpen(false)} xbutton={false}>
        <button className="btn btn-sm bg-red-600/20 text-red-600 absolute right-2" onClick={() => setIsOpen(!isOpen)}>
          ✕
        </button>
        <h3 className="font-bold text-2xl text-white">Profil</h3>
        <div className='flex flex-col gap-4 items-center mt-5'>
          <div className="flex flex-row gap-10">
            <Avatar/>
            <div className="flex flex-col justify-center text-white text-xl">
              <p>Ali Putuhena</p>
              <p>Admin</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-10">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Nick Name*</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-96 max-w-xs text-lg" />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Email*</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs text-lg" />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Password*</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs text-lg" />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Level Hak Akses*</span>
            </div>
            <input type="text" placeholder="Admin" className="input input-bordered w-full max-w-xs text-lg input-disabled" />
          </label>
        </div>
        <div className="flex flex-row justify-center gap-4 mt-10">
          <button className="bg-cancel rounded-xl text-2xl p-3 text-white">Cancel</button>
          <button className="bg-save rounded-xl text-2xl p-3 text-white">Save Change</button>
        </div>
        
      </Modal>
    </>

  );
};

export default ButtonProfil;