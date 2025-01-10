import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
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
    const body = await req.json()
    
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
            name: body.name,
            type: body.type,
            description: body.description,
            price: parseInt(body.price),
            rentalId: rentalExist[0].id

        }
    })
    if (!playStation) return NextResponse.json("Failed to create playstation", { status: 500 })

    return NextResponse.json(playStation, { status: 200 })
}

export async function PATCH(req) {
    const body = await req.json()

    const findPlayStation = await prismaClient.playStation.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findPlayStation) return NextResponse.json("Playstation not found", { status: 404 })

    const playStation = await prismaClient.playStation.update({
        where: {
            id: req.nextUrl.searchParams.get("id")
        },
        data: body
    })
    if (!playStation) return NextResponse.json("Failed to update playstation", { status: 500 })

    return NextResponse.json(playStation, { status: 200 })
}

export async function DELETE(req) {
    const findPlayStation = await prismaClient.playStation.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findPlayStation) return NextResponse.json("Playstation not found", { status: 404 })

    const playStation = await prismaClient.playStation.delete({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!playStation) return NextResponse.json("Failed to delete playstation", { status: 500 })

    return NextResponse.json(playStation, { status: 200 })
}