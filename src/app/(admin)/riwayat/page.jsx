import ListRiwayat from '@/components/Fragments/List/ListRiwayat'

const RiwayatPage = () => {
    return (
        <div className='bg-fourth'>
            <section className='container mx-auto bg-auto p-8 flex flex-col gap-8'>
                <h1 className="text-2xl font-bold text-white">Riwayat</h1>
                <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 place-items-center grid-rows-1 w-full border hover:shadow transition-all p-2 rounded-md cursor-pointer bg-white'>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Nama</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Nomor Urut</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Tipe</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Jam</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Konfirmasi</h4>
                    <h4 className='whitespace-nowrap font-bold' htmlFor="">Pembayaran</h4>
                </div>
                <ListRiwayat />
            </section>
        </div>
    )
}

export default RiwayatPage