import { prismaClient } from "@/database/prismaClient"
import { NextResponse } from "next/server";

export async function GET(req) {

    const data = await prismaClient.tv.findFirst({
        where: {
            id: req.nextUrl.searchParams.get('id')
        },
        select: {
            psId: true,
            jam:true,
            
        }
    })    
    
    if(!data) return NextResponse.json({message: "Tv not found"}, {status: 404})

    const playStation = await prismaClient.playStation.findFirst({
        where: {
            id: data.psId
        },
        select: {
            price: true
        }
    })
    if(!playStation) return NextResponse.json({message: "Playstation not found"}, {status: 404})

    

    const date = new Date()
    const tanggal = new Date()
    const tomorrow = new Date(date)

    const order = await prismaClient.transaction.findMany({
        where: {
            tvId: req.nextUrl.searchParams.get('id'),
            date: tomorrow.toJSON().split("T")[0]
        },
        select: {
            status: true,
            time: true,
            date: true
        },
    })
    

    const jam = data?.jam
    const available = jam.map((values) => {

        // Pengecekan jadwal
        if (tanggal.getDate() == tomorrow.getDate() && tanggal.getHours() >= parseInt(values.open.split(":")[0])) { //Sesuai hari dan jam
            values.isAvailable = false
        } else if (tomorrow.getDate() >= tanggal.getDate()) { //Sesuai hari
            values.isAvailable = true
        } else {
            values.isAvailable = false
        }

        // Pengecekan jadwal yang sudah terbooking            
        order.map((item) => {
            
            item.time?.map((v) => {
                if (new Date(item.date).getDate() == tomorrow.getDate()) {
                    if (values.id == v?.id) {
                        if(item.orders.statusPembayaran) {
                            values.isAvailable = false
                        }
                    }
                }
            })
        })

        return values
    })        

    return NextResponse.json(
        {
            message: "Success get jam",
            data: {
                date: tomorrow.toLocaleDateString(),
                type: data?.type,
                price: playStation?.price,
                available: available.filter((a) => a.isAvailable === true).length,
                jadwal: [...available]
            }

        }, {status: 200})

}