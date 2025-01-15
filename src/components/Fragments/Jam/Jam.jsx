import { useOrderStore } from '@/store/orderStore'
import React, { useState } from 'react'
import { CheckboxButton } from '../CheckboxButton'
import { ToRupiah } from '@/lib/toRupiah'

const Jam = ({ item, price }) => {
    const state = useOrderStore()       
    const handleInput = () => {
        if (isChecked) {

            state.setJam(JSON.parse(JSON.stringify(item)))
        } else {
            state.removeJam(item)
        }
    }
    
    const [isChecked, setChecked] = useState(false)


    // Render List Checkbox Jam
    return (
        <CheckboxButton key={item.id}
            value={JSON.stringify(item)}
            onInput={handleInput}
            isChecked={isChecked}
            disabled={!item.isAvailable}
            onChange={(event) => setChecked(!isChecked)}>
            <div className='flex flex-col gap-2 p-3'>
                <label className={`font-semibold text-xs ${!item.isAvailable ? "text-gray-400" : isChecked ? "text-secondary" : "text-gray-400"} }`} htmlFor="">60 menit</label>
                <div className='inline-flex justify-center gap-4 min-w-24 w-full'>
                    <h2 className={`text-[17px] ${!item.isAvailable ? "text-gray-400" : isChecked ? "text-secondary" : "text-gray-700"}  font-bold`} htmlFor="">{item.open}</h2>
                    <h2 className={`text-[17px] ${!item.isAvailable ? "text-gray-400" : isChecked ? "text-secondary" : "text-gray-700"}  font-bold`} htmlFor="">{item.close}</h2>
                </div>
                <h2 className={`text-lg font-normal ${!item.isAvailable ? "text-gray-400" : isChecked ? "text-secondary" : "text-gray-700"} `} htmlFor="">{ToRupiah(price)}</h2>
            </div>
        </CheckboxButton>
    )
}

export default Jam