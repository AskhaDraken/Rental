// import React from 'react'
// import Avatar from '@mui/material/Avatar';
// import liken from '../../../assets/liken.png'

const Ubah = () => {
    return (
        <div>
            <h3 className=" text-2xl text-black font-bold">Profil</h3>
            <div className='flex flex-col gap-4 items-center mt-5'>
                <div className="flex flex-row gap-10">
                    {/* <Avatar variant="rounded" sx={{ width: 150, height: 150 }} src='/liken.png' /> */}
                    <div className="flex flex-col justify-center text-black font-bold text-xl">
                        <p>Aliken</p>
                        <p>User</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-10">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-black font-bold">Nick Name*</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered text-lg" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-black font-bold">Email*</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs text-lg" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-black font-bold">Password*</span>
                    </div>
                    <input type="text" placeholder="********  " className="input input-bordered w-full max-w-xs text-lg" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-black font-bold">Level Hak Akses*</span>
                    </div>
                    <input type="text" placeholder="User" readOnly className="input input-bordered w-full max-w-xs text-lg input-disabled" />
                </label>
            </div>
            <div className="flex flex-row justify-center gap-4 mt-10">
                <button className="bg-sixth rounded-xl text-2xl p-3 text-white">Cancel</button>
                <button className="bg-seventh rounded-xl text-2xl p-3 text-white">Save Change</button>
            </div>

        </div>
    )
}

export default Ubah