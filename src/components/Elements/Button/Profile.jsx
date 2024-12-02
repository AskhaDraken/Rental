"use client"


import { Avatar } from '@mui/material'

const ProfileUser = () => {
    return (
        <div className='w-fit py-6 px-6 bg-secondary rounded-xl'>
            <h3 className="font-bold text-2xl text-white px-5 py-3">Profil</h3>
            <div className='flex flex-col gap-4 items-center mt-5'>
                <div className="flex flex-row gap-10">
                    <Avatar variant="rounded" sx={{ width: 150, height: 150 }} src='/liken.png' />
                    <div className="flex flex-col justify-center text-white text-xl">
                        <p>Aliken</p>
                        <p>User</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-10">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white font-bold">Nick Name*</span>
                    </div>
                    <input type="text" placeholder="Type here" readOnly className="input input-bordered rounded-md h-10 text-lg" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white font-bold">Email*</span>
                    </div>
                    <input type="text" placeholder="Type here" readOnly className="input input-bordered w-full max-w-xs rounded-md h-10 text-lg" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white font-bold">Password*</span>
                    </div>
                    <input type="text" placeholder="********  " readOnly className="input input-bordered w-full max-w-xs rounded-md h-10 text-lg" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white font-bold">Level Hak Akses*</span>
                    </div>
                    <input type="text" placeholder="User" readOnly className="input input-bordered w-full max-w-xs text-lg rounded-md h-10 input-disabled" />
                </label>
            </div>

        </div>
    )
}

export default ProfileUser