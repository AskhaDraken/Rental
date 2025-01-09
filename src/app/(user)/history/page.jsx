"use client"

import { FaCircleCheck } from 'react-icons/fa6'
// import gambar from '../../assets/liken.png'
import Modal from '@/components/Elements/Modal/Modal'
import BtnHistory from '@/components/Layouts/HistoryPembayaran.jsx'
import { X } from "react-feather"


const Riwayatproviders = () => {
    const [open, setOpen] = useState(false)
    const history = () => {
        document.getElementById('modalhistory').showModal()
    }
    const [isSelesai, setIsSelesai] = useState(true)

    return (
        <>
            <div className='flex flex-col p-10 w-full h-screen py-6'>
                {/* <h1 className='font-bold text-2xl text-primary font-body'</h1> */}
                <div className='flex w-full flex-row justify-center gap-x-28 mt-10'>

                    <div className='flex flex-col gap-2'>
                        <div className="card bg-white w-full h-20 justify-center shadow-sm shadow-black">
                            <div className="card-body">
                                <div className="flex gap-28 justify-center items-center w-full">
                                    <figure className='aspect-square max-w-14'>
                                        <img className='rounded-full' src='/liken.png' alt="" srcset="" />
                                    </figure>
                                    <h2 className='text-lg text-black'>
                                        <strong >Aliken</strong>
                                    </h2>
                                    <h2 className='text-lg text-black'>
                                        <strong>Tantui</strong>
                                    </h2>
                                    <h2 className='text-lg text-black'>
                                        <strong>21/04/2002</strong>
                                    </h2>
                                    <h2 className='text-lg text-black/'>
                                        <strong>Rp.100.000</strong>
                                    </h2>
                                    <div className="flex justify-end">
                                        <BtnHistory className='btn bg-primary text-white' text='Liat Detail Riwayat' id='modalhistory' onClick={() => document.getElementById('modalhistory').showModal()}></BtnHistory>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="bg-white" id="modalhistory" onClick={() => document.getElementById('modalhistory').close()}>
                <a className='absolute font-bold text-black' href="" onClick={() => { document.getElementById('modalhistory').close(); setIsSelesai(false) }}><X/></a>
                <div className=" bg-white p-2 text-primary-content w-96 ">
                    <div className='flex justify-center items-center'>
                        <figure className='aspect-square max-w-36'>
                            <img className='rounded-full' src='/liken.png' alt="" srcset="" />
                        </figure>
                    </div>
                    <div className='text-lg font-bold text-center my-2'>
                        <h1>Aliken</h1>
                    </div>
                    <div className='text-center my-2'>
                        <h1>Ditransfer ke Gor Putra Bone</h1>
                        <h1>29 Agustus 2024, 20:00</h1>
                    </div>
                    <hr />
                    <div className='font-bold my-2'>
                        <h1>Rincian Transaksi</h1>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <div>
                            <h1>Playstation 1</h1>
                            <h1>Status</h1>
                            <h1>Metode Penbayaran</h1>
                            <h1>Waktu</h1>
                            <h1>Tanggal</h1>
                            <h1>ID Transaksi</h1>
                            <h1>Lama Bermain</h1>
                            <h1>Jam</h1>
                        </div>
                        <div className='text-end'>
                            <h1>Galunggung</h1>
                            <h1 className='text-success inline-flex items-center gap-2'>Selesai <FaCircleCheck /></h1>
                            <h1>Dana</h1>
                            <h1>20:00</h1>
                            <h1>21/04/2002</h1>
                            <h1>012345678</h1>
                            <h1>2 Jam</h1>
                            <h1>18:00 - 20:00</h1>
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='flex justify-between'>
                        <div className='flex-col'>
                            <h1>Harga</h1>
                            <h1>Jumlah</h1>
                        </div>
                        <div className='flex-col text-end'>
                            <h1>Rp.50.000</h1>
                            <h1>x2</h1>
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='flex justify-between'>
                        <h1 className='font-semibold text-xl'>Total</h1>
                        <h1 className='font-semibold text-xl'>Rp.100.000</h1>
                    </div>
                    <div className='flex justify-center items-center'>
                        {/* <h1 >kembali</h1> */}
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Riwayatproviders