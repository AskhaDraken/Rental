import ModalLayout from '@/components/Elements/Modal/Modal'
import { useFetchPlaystation } from '@/features/playstation'
import { IoPulse } from 'react-icons/io5'
import CardPlaystation from '../Card/CardPlaystation'
// import ListBookingLapangan from '../List/ListBookingLapangan'

const ButtonBooking = () => {
    const handleBtnOrder = () => {
        document.getElementById("orderManual").showModal()
    }

    const { data: playstation, isLoading } = useFetchPlaystation()


    return (
        <>
            <span className="bg-secondary p-4 rounded-full w-fit h-fit cursor-pointer hover:scale-105 transition-all" onClick={handleBtnOrder}><IoPulse color='white' size={36} /></span>
            <ModalLayout id="orderManual" title="Booking Lapangan" onClick={() => document.getElementById("orderManual").close()}>
                {/* <ListBooking /> */}
                <div className='flex flex-wrap gap-4'>
                    {
                        playstation?.data.map((item, index,) => (
                            <CardPlaystation item={item} key={index} />
                        ))
                    }
                </div>
            </ModalLayout>
        </>
    )
}

export default ButtonBooking