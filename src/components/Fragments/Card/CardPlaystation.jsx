import ModalLayout from '@/components/Elements/Modal/Modal'
import { ToRupiah } from '@/lib/toRupiah'
import ListTv from '../List/ListTv'

const CardPlaystation = ({ item }) => {
    return (
        <>
            <div className="card bg-third w-96 shadow-xl text-white" >
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <h2 className='font-semibold text-lg'>{ToRupiah(item.price)}</h2>
                    <p>{item.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => document.getElementById("modalCheckout" + item.id).showModal()}>Booking Sekarang</button>
                    </div>
                </div>
            </div>
            <ModalLayout id={"modalCheckout" + item.id} onClick={() => document.getElementById("modalCheckout" + item.id).close()} title="Booking Rental">
                <ListTv psId={item.id} />
            </ModalLayout>
        </>
    )
}

export default CardPlaystation