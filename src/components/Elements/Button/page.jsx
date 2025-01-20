"use client"
import { usePostLogout } from '@/features/auth.js';
import { useFetchUser } from '@/features/profil';
import { useRouter } from 'next/navigation.js';

const ButtonProfileCustomer = () => {
  const { data: user, isLoading } = useFetchUser()
  
  const route = useRouter()

  return (
    <details className='dropdown p-4 rounded-md flex flex-row justify-center shadow-md'>

      <summary tabIndex={0} role='button' className='flex items-center justify-center button '>
        <img src={user?.data.Profile.picture != null ? user?.data.Profile.picture : '/emptyUser.png'} alt="" className='h-12 rounded-full' />
      </summary>
      <ul className="menu dropdown-content translate-y-16 -translate-x-12 bg-white rounded-xl z-10 absolute w-44 p-2 shadow-md">

        <li><button className='text-black text-lg' onClick={() => route.push('/profil')}>Profil</button></li>
        <li><button className='text-red-600 text-lg font-bold' onClick={usePostLogout}>Kaluar</button></li>
      </ul>
    </details>
  )
}

export default ButtonProfileCustomer