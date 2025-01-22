import { prismaClient } from "@/database/prismaClient"
import { NextResponse } from "next/server"

export async function GET(req) {

    const date = new Date()

    const totalOrder = await prismaClient.transaction.findMany({
        where: {
            status: "success",
        }
    })

    const television = await prismaClient.tv.findMany()
    const playStation = await prismaClient.playStation.findMany({ select: { id: true, price: true } })
    const room = await prismaClient.room.findMany({ select: { id: true, price: true } })

    const income = totalOrder.map((item) => {
        const dateOrder = new Date(item.date)

        if (dateOrder.getMonth() == date.getMonth()) {
            const findTv = television.find((value) => value.id == item.tvId)
            const price = parseInt(playStation.find((value) => value.id == findTv.psId).price) + parseInt(room.find((value) => value.id == findTv.roomId).price)

            return item.time.length * price
        }
    })

    const jam = totalOrder.map((item) => {
        const dateOrder = new Date(item.date)
        if (dateOrder.getMonth() == date.getMonth()) {
            return item.time.length
        }
    })


    const user = totalOrder.map((item) => {
        const dateOrder = new Date(item.date)
        if (dateOrder.getMonth() == date.getMonth()) {
            return item.userId
        }
    })

    const result = {
        totalUser: user.length,
        totalJam: jam.reduce((a, b) => a + b, 0),
        income: income.reduce((a, b) => a + b, 0),

    }

    return NextResponse.json(result, { status: 200 })

}