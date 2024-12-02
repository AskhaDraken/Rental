"use client"

const game = () => {
    const CardGame = [
        {
            gambar: '/spiderman.jpg',
            nama: 'Spiderman',
            order: 'lorem ipsum dolor sit amet',
        },
        {
            gambar: 'fifa23.jpg',
            nama: "Fifa23",
            order: 'lorem ipsum dolor sit amet',
        },
        {
            gambar: '/red dead.jpg',
            nama: "Red Dead Redemption 2",
            order: 'lorem ipsum dolor sit amet',
        },
        {
            gambar: '/mortal kombat.jpg',
            nama: "Mortal Kombat 10",
            order: 'lorem ipsum dolor sit amet',
        },
        {
            gambar: '/TLOU.jpg',
            nama: "The Last Of Us",
            order: 'lorem ipsum dolor sit amet',
        },
        {
            gambar: '/gta.jpg',
            nama: "Grand Theft Auto V",
            order: 'lorem ipsum dolor sit amet',
        },
        {
            gambar: '/witcher.jpg',
            nama: "Witcher 3",
            order: 'lorem ipsum dolor sit amet',
        },

    ]
    return (
        <div className='overflow-auto relative '>
            <div className='grid grid-cols-1 w-full h-screen'>
                <div className=' flex flex-wrap justify-center w-full h-fit bg-white text-black py-5'>

                    <div className='flex justify-center'>
                        <h1 className='text-3xl font-bold text-primary'>Daftar Game </h1>
                        {/* <div className='w-96 h-fit p-2 flex justify-center translate-y-5 items-center rounded-3xl border shadow-xl mb-10'>
                <input type="text" placeholder='search' className=' bg-white text-lg '/>
                <button className='flex justify-between'>
                <IoSearchOutline className='w-12 h-9 translate-x-14 bg-primary text-white rounded-full text-2xl'/>
                </button>
              </div> */}
                    </div>
                    <div className='grid relative translate-y-[-5%]'>
                        <div className='flex jusfitify-center gap-4 overflow-y-auto shadow-xl md:min-w-80 p-4 min-w-64'>
                            {/* <button className='flex justify-between'>
                <IoIosArrowDropleftCircle className='w-9 h-9 translate-x-14 bg-primary text-white rounded-full text-2xl'/>
                </button> */}
                            {
                                CardGame.map((CardGame, index) => {
                                    return (
                                        <div className=" card bg-base-100 w-72 mt-14 shadow-2xl shadow-black" key={index}>
                                            <figure className="px-5 pt-5 bg-white" >
                                                <img
                                                    src={CardGame.gambar}
                                                    alt="Shoes"
                                                    className="rounded-xl" />
                                            </figure>
                                            <div className="card-body text-center bg-white">
                                                <h2 className="card-title text-black">{CardGame.nama}</h2>
                                                <p className='text-black flex '>
                                                    {CardGame.order}
                                                </p>
                                                <div className="flex card-actions px-52 mt-6 justify-center">
                                                    <button className="btn btn-primary text-white">Play</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default game