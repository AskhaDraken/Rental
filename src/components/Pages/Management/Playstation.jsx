import Button from '@/components/Elements/Button'
import ModalLayout from '@/components/Elements/Modal/Modal'
import CardPlaystationAdmin from '@/components/Fragments/Card/Playstation/CardPlaystationAdmin'
import FormPlaystation from '@/components/Fragments/Form/FormPlaystation'
import { useFetchPlaystation } from '@/features/playstation'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const PlaystationPage = () => {
    const query = useSearchParams()
    const { data: listPlaystation, isLoading, refetch } = useFetchPlaystation(query.get('value'))

    useEffect(() => {
        refetch()
    },[query.get('value')])

    return (
        <>
            <div className="flex flex-col w-fit gap-4">
                <Button className="btn-info w-fit text-white" onClick={() => document.getElementById("addPlaystation").showModal()}>Tambah Playstation</Button>
                <div className="grid grid-cols-3 gap-4">
                    {
                        listPlaystation?.data.map((item, index) => (
                            <CardPlaystationAdmin item={item} key={index}/>
                        ))
                    }
                </div>
            </div>
            <ModalLayout title="Tambah Playstation" id="addPlaystation" onClick={() => document.getElementById("addPlaystation").close}>
                <FormPlaystation type='create' onClick={() => document.getElementById("addPlaystation").close()}/>
            </ModalLayout>
        </>
    )
}

export default PlaystationPage