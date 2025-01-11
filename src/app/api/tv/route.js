import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req) {


    if (req.nextUrl.searchParams.get('id')) {
        const tv = await prismaClient.tv.findFirst({
            where: {
                id: req.nextUrl.searchParams.get('id')
            }
        })
        if (!tv) return NextResponse.json("Television Not Found", { status: 404 })

        const playStation = await prismaClient.playStation.findFirst({
            where: {
                id: tv.psId
            },
            select: {
                name: true,
                price: true
            }
        })
        if (!playStation) return NextResponse.json("Playstation Not Found", { status: 404 })


        return NextResponse.json(
            {
                ...tv,
                ...playStation,
                playstationName: playStation.name
            },
            { status: 200 }
        )

    } else {

        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
        const { role } = jwtDecode(session.token)

        if (role == "user") {
            return NextResponse.json(await prismaClient.tv.findMany(
                {
                    where: {
                        psId: req.nextUrl.searchParams.get('psId')
                    }
                }
            ), { status: 200 })

        } else if (role == "admin") {
            return NextResponse.json(await prismaClient.tv.findMany(), { status: 200 })
        }

    }


}

export async function POST(req) {
    const body = await req.json()

    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            userId: req.userId
        }
    })
    if (!findRentalExist) return NextResponse.json("Rental not found", { status: 404 })

    const findPsExist = await prismaClient.playStation.findFirst({
        where: {
            id: body.psId
        }
    })
    if (!findPsExist) return NextResponse.json("Playstation not found", { status: 404 })

    const findRoomExist = await prismaClient.room.findFirst({
        where: {
            id: body.roomId
        }
    })
    if (!findRoomExist) return NextResponse.json("Room not found", { status: 404 })

    console.log(findRoomExist);



    // Creating jam
    const openSplit = findRentalExist.open
    const closeSplit = findRentalExist.close

    findRentalExist.open = openSplit.split(":")[0] + ":" + "00"
    findRentalExist.close = closeSplit.split(":")[0] + ":" + "00"


    const jam = []
    let lenghtJam = 0
    let checkJam = "today"

    if (findRentalExist.open === findRentalExist.close) {
        return NextResponse.json({ message: "Jam tidak boleh sama" }, { status: 400 })
    }

    if (parseInt(findRentalExist.open) <= parseInt(findRentalExist.close)) {
        checkJam = "today"
    } else {
        checkJam = "tomorrow"
    }

    if (checkJam === "tomorrow") {
        lenghtJam = parseInt(findRentalExist.close) + 24
    } else if (checkJam === "today") {
        lenghtJam = parseInt(findRentalExist.close)
    } else {
        lenghtJam = parseInt(findRentalExist.close)
    }

    for (let i = parseInt(findRentalExist.open); i < lenghtJam; i++) {
        if (i >= 25) {
            jam.push({
                id: jam.length + 1,
                open: `0${i - 24}:00`,
                close: `0${i - 23}:00`,
            })
        } else {
            if (i < 24) {
                jam.push({
                    id: jam.length + 1,
                    open: `${i > 9 ? i : "0" + i}:00`,
                    close: `${i === 23 ? "00" : (i + 1) > 9 ? i + 1 : "0" + (i + 1)}:00`,
                })

            } else {
                jam.push({
                    id: jam.length + 1,
                    open: `0${i == 24 ? 0 : i}:00`,
                    close: `0${i - 23}:00`,
                })
            }
        }
    }


    const tv = await prismaClient.tv.create({
        data: {
            name: body.name,
            nomorUrut: parseInt(body.nomorUrut),
            description: body.description,
            jam: jam,
            psId: findPsExist.id,
            rentalId: findRentalExist.id,
            roomId: findRoomExist.id
        }
    })

    if (!tv) return NextResponse.json("Failed to create tv", { status: 500 })

    return NextResponse.json(tv, { status: 200 })
}

export async function PATCH(req) {
    const body = await req.json()

    const findTvExist = await prismaClient.tv.findFirst({
        where: {
            id: req.nextUrl.searchParams.get('id')
        }
    })
    if (!findTvExist) return NextResponse.json("Tv not found", { status: 404 })


    const tv = await prismaClient.tv.update({
        where: {
            id: req.nextUrl.searchParams.get('id')
        },
        data: body
    })
    if (!tv) return NextResponse.json("Failed to update tv", { status: 500 })

    return NextResponse.json(tv, { status: 200 })
}

export async function DELETE(req) {
    console.log(req.nextUrl.searchParams.get('id'));

    const findTv = await prismaClient.tv.findFirst({
        where: {
            id: req.nextUrl.searchParams.get('id')
        }
    })
    if (!findTv) return NextResponse.json("Tv not found", { status: 404 })

    const tv = await prismaClient.tv.delete({
        where: {
            id: req.nextUrl.searchParams.get('id')
        }
    })
    if (!tv) return NextResponse.json("Failed to delete tv", { status: 500 })

    return NextResponse.json(tv, { status: 200 })
}