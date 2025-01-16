import ListTransaksi from '@/components/Fragments/List/ListTransaksi'

const TransaksiPage = () => {

    return (
        <div className='bg-fourth'>

            <section className='container mx-auto bg-auto p-8 min-h-screen flex flex-col gap-8'>
                {/* <h1 className="text-2xl font-bold text-white">Transaksi</h1> */}
                <ListTransaksi />
            </section>
        </div>
    )
}

export default TransaksiPage