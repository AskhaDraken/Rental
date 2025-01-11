import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Elements/Modal/Modal'
import CardRoomAdmin from '@/components/Fragments/Card/Room/CardRoomAdmin'
import FormRoom from '@/components/Fragments/Form/FormRoom'
import { useFetchRoom } from '@/features/room'

const RoomPage = () => {
    const { data: listRoom } = useFetchRoom()
    return (
        <>
            <div className="flex flex-col w-fit gap-4">
                <Button className="btn-info w-fit text-white" onClick={() => document.getElementById("addRoom").showModal()}>Tambah Ruangan</Button>
                <div className="grid grid-cols-3 gap-4">
                    {
                        listRoom?.data.map((item, index) => (
                            <CardRoomAdmin item={item} key={index} />
                        ))
                    }
                </div>
            </div>
            <ModalLayout title="Tambah Television" id="addRoom" onClick={() => document.getElementById("addRoom").close}>
                <FormRoom type='create' onClick={() => document.getElementById("addRoom").close()} />
            </ModalLayout>
        </>
    )
}

export default RoomPage