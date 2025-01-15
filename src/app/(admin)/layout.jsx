import React from 'react'

const Layout = ({children}) => {
  return (
    <section className='flex flex-col w-full h-full min-h-screen p-16 bg-fourth'>
        {children}
    </section>
  )
}

export default Layout