import ListRiwayat from '@/components/Fragments/List/ListRiwayat'

const RiwayatPage = () => {
    return (
        <div className='bg-fourth'>

            <section className='container mx-auto bg-auto p-8 min-h-screen flex flex-col gap-8'>
                <h1 className="text-2xl font-bold text-white">Riwayat</h1>
                <ListRiwayat />
            </section>
        </div>
    )
}

export default RiwayatPage