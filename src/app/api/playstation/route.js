import { prismaClient } from "@/database/prismaClient"
import { NextResponse } from "next/server"

export async function GET(req) {
    
    if (req.nextUrl.searchParams.get("id")) {
        return NextResponse.json(
            await prismaClient.playStation.findFirst({
                where: {
                    id: req.nextUrl.searchParams.get("id")
                }
            }),
            {status: 200}
        )
    } else {

        return NextResponse.json(
            await prismaClient.playStation.findMany(),
            { status: 200 }
        )
    }

}

export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })

    const { id } = jwtDecode(session.token)

    const rentalExist = await prismaClient.rental.findMany({
        where: {
            userId: id
        }
    })
    if (rentalExist.length == 0) return NextResponse.json("Rental not found", { status: 404 })

    const playStation = await prismaClient.playStation.create({
        data: {
            name: req.name,
            type: req.type,
            description: req.description,
            price: req.price,
            rentalId: rentalExist[0].id

        }
    })
    if (!playStation) return NextResponse.json("Failed to create playstation", { status: 500 })

    return NextResponse.json(playStation, { status: 200 })
}

export async function PATCH(req) {
    const body = {
        name: req.name,
        type: req.type,
        description: req.description,
        price: req.price
    }

    const findPlayStation = await prismaClient.playStation.findFirst({
        where: {
            id: req.id
        }
    })
    if (!findPlayStation) return NextResponse.json("Playstation not found", { status: 404 })

    const playStation = await prismaClient.playStation.update({
        where: {
            id: req.id
        },
        data: body
    })
    if (!playStation) return NextResponse.json("Failed to update playstation", { status: 500 })

    return NextResponse.json(playStation, { status: 200 })
}

export async function DELETE(req) {
    const findPlayStation = await prismaClient.playStation.findFirst({
        where: {
            id: req.id
        }
    })
    if (!findPlayStation) return NextResponse.json("Playstation not found", { status: 404 })

    const playStation = await prismaClient.playStation.delete({
        where: {
            id: req.id
        }
    })
    if (!playStation) return NextResponse.json("Failed to delete playstation", { status: 500 })

    return NextResponse.json(playStation, { status: 200 })
}