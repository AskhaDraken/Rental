import { Textarea } from '@mui/joy'
import { FormControl, InputLabel, NativeSelect } from '@mui/material'
import React from 'react'

const FormGame = () => {
    return (
        <form className='flex flex-col' method="dialog">
            <div className='flex'>
                <h3 className="font-bold text-lg">Game Form</h3>
            </div>
            <div className='grid grid-row gap-10 mt-5'>
                <Textarea
                    name="Neutral"
                    placeholder="Nama PS"
                    variant="outlined"
                    color="neutral"
                />
                <Textarea
                    name="Soft"
                    placeholder="Deskripsi PS"
                    variant="soft"
                />
                <FormControl fullWidth>
                    <InputLabel  variant="standard" htmlFor="uncontrolled-native">
                        Tipe
                    </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: 'Tipe',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={10}>PS2</option>
                        <option value={20}>PS3</option>
                        <option value={30}>PS4</option>
                        <option value={30}>PS5</option>
                    </NativeSelect>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Harga
                    </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: 'Harga',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={10}>Rp 5000</option>
                        <option value={20}>Rp 10000</option>
                        <option value={30}>Rp 15000</option>
                        <option value={30}>Rp 20000</option>
                    </NativeSelect>
                </FormControl>
            </div>
            <div className="mt-5">
                <button className="bg-purple-800 w-full rounded-md mt-2 text-white p-2">Add</button>
            </div>
        </form>
    )
}

export default FormGame