import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req) {

    if (req.nextUrl.searchParams.get("id")) {
        const room = await prismaClient.room.findFirst({
            where: {
                id: req.nextUrl.searchParams.get("id")
            }
        })
        if (!room) return NextResponse.json("Room not found", { status: 404 })

        return NextResponse.json(room, { status: 200 })
    }
    const room = await prismaClient.room.findMany({
        where: {
            name: {
                contains: req.nextUrl.searchParams.get('v') != "null" ? req.nextUrl.searchParams.get('v') || "" : "",
                mode: 'insensitive'
            }
        }
    })


    return NextResponse.json(room, { status: 200 })
}

export async function POST(req) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)
    const body = await req.json()

    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            userId: id
        }
    })
    if (!findRentalExist) return NextResponse.json("Rental not found", { status: 404 })

    const room = await prismaClient.room.create({
        data: {
            name: body.name,
            type: body.type,
            price: parseInt(body.price),
            rentalId: findRentalExist.id
        }
    })
    if (!room) return NextResponse.json("Failed to create room", { status: 500 })

    return NextResponse.json(room, { status: 200 })
}

export async function PATCH(req) {

    const findRoomExist = await prismaClient.room.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findRoomExist) return NextResponse.json("Room not found", { status: 404 })

    const body = await req.json()

    const room = await prismaClient.room.update({
        where: {
            id: req.nextUrl.searchParams.get("id")
        },
        data: body
    })
    if (!room) return NextResponse.json("Failed to update room", { status: 500 })

    return NextResponse.json(room, { status: 200 })
}

export async function DELETE(req) {

    const findRoomExist = await prismaClient.room.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findRoomExist) return NextResponse.json("Room not found", { status: 404 })

    const room = await prismaClient.room.delete({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!room) return NextResponse.json("Failed to delete room", { status: 500 })

    return NextResponse.json(room, { status: 200 })

}