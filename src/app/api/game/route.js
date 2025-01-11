import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req) {
    
    if (req.nextUrl.searchParams.get("id")) {
        return NextResponse.json(
            await prismaClient.game.findFirst({
                where: {
                    id: req.nextUrl.searchParams.get("id")
                }
            }),
            {status: 200}
        )
    } else {

        return NextResponse.json(
            await prismaClient.game.findMany(),
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

    const game = await prismaClient.game.create({
        data: {
            name: body.name,
            description: body.description,
            rentalId: rentalExist[0].id
        }
    })
    if (!game) return NextResponse.json("Failed to create game", { status: 500 })

    return NextResponse.json(game, { status: 200 })
}

export async function PATCH(req) {
    const body = await req.json()

    const findGame = await prismaClient.game.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findGame) return NextResponse.json("Playstation not found", { status: 404 })

    const game = await prismaClient.game.update({
        where: {
            id: req.nextUrl.searchParams.get("id")
        },
        data: body
    })
    if (!game) return NextResponse.json("Failed to update game", { status: 500 })

    return NextResponse.json(game, { status: 200 })
}

export async function DELETE(req) {
    const findGame = await prismaClient.game.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findGame) return NextResponse.json("Game not found", { status: 404 })

    const game = await prismaClient.game.delete({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!game) return NextResponse.json("Failed to delete game", { status: 500 })

    return NextResponse.json(game, { status: 200 })
}