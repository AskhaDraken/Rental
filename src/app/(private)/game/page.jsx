"use client"
import { useEffect, useState } from "react" 
import { useFetchGame } from "@/features/game";
import { useSearchParams } from "next/navigation";
import CardGame from "@/components/Fragments/Card/Game/CardGame";
import Search from "@/components/Fragments/Search/Search";

const GamePage = () => {
    const [type, setType] = useState()
    const query = useSearchParams()
    const queryParams = {
        value: query.get('value'),
        type: type
    }
    const { data: listGame, isLoading, refetch, } = useFetchGame(queryParams)

    useEffect(() => {
        refetch()
    }, [query.get('value'), type])

    return (
        <div className='bg-fourth text-white min-h-screen'>
            <section className='container mx-auto bg-auto p-16 flex flex-col gap-8' >
                <div className="w-full inline-flex justify-between text-black">
                    <select className="select select-bordered w-full max-w-xs" onChange={(event) => { setType(event.target.value) }}>
                        <option disabled selected>Filter</option>
                        <option>Semua</option>
                        {
                            isLoading ? <h1>loading</h1> : listGame?.data.filter.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))
                        }
                    </select>
                    <Search />
                </div>
                <div className="grid grid-cols-4">
                    {
                        listGame?.data.data.map((item, index) => (
                            <CardGame item={item} key={index} />
                        ))
                    }
                </div>
                {/* <div className='flex flex-col gap-10 items-center '>
                    <img src="/logo.png" alt="" className='max-w-72 ' />

                    <div className='flex flex-wrap gap-4'>
                        {
                            playstation?.data.map((item, index,) => (
                                <CardPlaystation item={item} key={index} />
                            ))
                        }
                    </div>
                </div> */}
            </section>
        </div>
    )

}

export default GamePage