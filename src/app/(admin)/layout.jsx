import React from 'react'

const Layout = ({children}) => {
  return (
    <section className='flex flex-col w-full h-full min-h-screen p-16 bg-white'>
        {children}
    </section>
  )
}

export default Layout