import { prismaClient } from "@/database/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
    const date = new Date()

    const totalOrder = await prismaClient.transaction.findMany({
        where: {
            status: "success",
            date: date.toLocaleDateString()
        }
    })


    const totalConfirm = await prismaClient.transaction.findMany({
        where: {
            status: 'success',
            isConfirm: 'accept',
            date: date.toLocaleDateString()
        },
    })

    const television = await prismaClient.tv.findMany()
    const playStation = await prismaClient.playStation.findMany({ select: { id: true, price: true } })
    const room = await prismaClient.room.findMany({ select: { id: true, price: true } })

    const income = totalOrder.map((item) => {
        const findTv = television.find((value) => value.id == item.tvId)
        const price = parseInt(playStation.find((value) => value.id == findTv.psId).price) + parseInt(room.find((value) => value.id == findTv.roomId).price)

        return item.time.length * price
    })



    const result = {
        totalOrder: totalOrder.length,
        konfirmasi: totalConfirm.length,
        income: income.reduce((a, b) => a + b, 0)
    }

    return NextResponse.json(result)

}