// import Button from "../Elements/Button/Button"

const Autolayout = ({ children, title, note, to, catatan }) => {
    return (
        <div className='w-full h-screen'>
            <div style={{ backgroundImage: `url("/background1.png")` }} className='w-full h-full bg-cover bg-center'>
                <div className='grid grid-cols-2 w-full gap-4 h-full place-items-center'>
                    <img className="flex-[1_1_0%] max-w-xl" src="/logo.png" alt="" srcset="" />
                    <div className='flex items-center justify-center'>
                        <div className='w-fit bg-white/15  h-fit py-10 px-10 rounded-md'>
                            <h1 className='font-poppins font-semibold text-3xl text-center text-white'>{title}
                            </h1>
                            {/* <p className='font-medium text-white white'>Plaese enter your details</p> */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Autolayout