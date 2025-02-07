import Link from 'next/link.js';
import { usePostLogout } from '@/features/auth.js';
import { LuClipboardList, LuShoppingCart, LuLogOut, LuUser, LuUserCircle, LuHistory } from "react-icons/lu"
import ButtonSide from '@/components/Elements/Button/ButtonSide';
import { useStorePublic } from '@/store/storePublic';
import { Home } from 'react-feather';
import { useFetchUser } from '@/features/profil';
import ImagePreview from '@/components/Elements/Image';


const Sidebar = () => {
    const state = useStorePublic()

    const { data: user, isLoading } = useFetchUser()
    
    return (
        <div className={`flex flex-row lg:h-screen lg:fixed z-50 lg:min-w-64 lg:w-fit z-${state.isMenu ? 50 : 0}`}>
            <nav className="flex items-center justify-start gap-4 lg:hidden bg-third sticky md:fixed p-4 min-w-full z-20">
                <label className="btn btn-circle bg-transparent border-none swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />

                    {/* hamburger icon */}
                    <svg
                        color="white"
                        className="swap-off fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                        onClick={() => state.setMenu(!state.isMenu)}>
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>

                    {/* close icon */}
                    <svg
                        color="white"
                        className="swap-on fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                        onClick={() => state.setMenu(!state.isMenu)}>
                        <polygon
                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                    </svg>
                </label>
                <Link href='/' className='inline-flex items-center justify-center hover:scale-[101%] transition-all'>
                    <h1 className=' text-2xl text-white font-bold '>Eternity</h1>
                </Link>
            </nav>
            <aside className={`h-full top-16 lg:top-0 ${state.isMenu ? "-translate-x-0" : "-translate-x-64"} lg:translate-x-0 transition-all fixed ease-linear lg:relative w-fit z-50 max-w-64 min-w-64`}>
                <nav className='h-full flex flex-col bg-third/70 lg:bg-third backdrop-blur-sm shadow-sm p-4 gap-4'>

                    <Link href='/dashboard' className='hidden lg:inline-flex lg:flex-col items-center justify-center hover:scale-[101%] transition-all'>
                        <figure className="aspect-square max-w-36">
                            <ImagePreview src='/logo.png' />
                        </figure>
                    </Link>

                    <ButtonSide className="w-full" onClick={() => state.setMenu(!state.isMenu)} href="/dashboard"><Home size={26} />Dashboard</ButtonSide>
                    <ButtonSide className="w-full" onClick={() => state.setMenu(!state.isMenu)} href="/management"><LuClipboardList size={26} />Management</ButtonSide>
                    <ButtonSide className="w-full" onClick={() => state.setMenu(!state.isMenu)} href="/transaksi"><LuShoppingCart size={26} />Transaksi</ButtonSide>
                    <ButtonSide className="w-full" onClick={() => state.setMenu(!state.isMenu)} href="/riwayat"><LuHistory size={26} />Riwayat</ButtonSide>

                    {/* Profil */}
                    <div className="hidden mt-auto lg:flex items-center justify-between relative bg-white  rounded-md w-full h-fit p-2">
                        <div className="dropdown dropdown-right dropdown-end w-full h-full">
                            <div tabIndex={0} role="button" className="inline-flex gap-x-4 w-full h-full items-center justify-start">
                                <div className="avatar">
                                    <div className='max-w-10 rounded-full'>
                                        <ImagePreview className=' aspect-square' width={35} src={user?.data.Profile.picture != null ? user?.data.Profile.picture : '/emptyUser.png'} alt="" />
                                    </div>
                                </div>
                                <span className='text-lg text-black font-semibold'>{user?.data.fullname.split(" ")[0]}</span>
                            </div>
                            <div className="dropdown-content menu translate-x-10 translate-y-3 rounded-md bg-base-100 z-[1] min-w-52 p-2 shadow gap-2 text-white">
                                <Link
                                    href="/profil"
                                    className="btn text-gray-400 btn-outline border-none w-full justify-start hover:bg-third"
                                >
                                    <LuUserCircle size={26} />Profil
                                </Link>
                                <button
                                    className="btn text-red-500 btn-outline border-none w-full justify-start hover:bg-red-500"
                                    onClick={usePostLogout}
                                >
                                    <LuLogOut size={26} />Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar