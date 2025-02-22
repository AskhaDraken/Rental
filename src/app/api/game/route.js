import { prismaClient } from "@/database/prismaClient"
import { ImageUpload } from "@/lib/imageUpload"
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
            { status: 200 }
        )
    } else {
        const game = await prismaClient.game.findMany({
            where: {
                AND: [
                    {
                        name: {
                            contains: req.nextUrl.searchParams.get('value') != "null" ? req.nextUrl.searchParams.get('value') : "",
                            mode: 'insensitive'
                        }
                    },
                    {
                        type: {
                            // contains: "PS4",
                            contains: req.nextUrl.searchParams.get('type') != "null" ? req.nextUrl.searchParams.get("type") != "Semua" ? req.nextUrl.searchParams.get("type") : "" : "",
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        })


        const filter = await prismaClient.game.findMany()

        const typeFilter = []

        filter.map((item) => {
            typeFilter.push(item.type)
        })

        return NextResponse.json(
            {
                data: game,
                filter: [...new Set(typeFilter)],
            },
            { status: 200 }
        )
    }

}

export async function POST(req) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })

    const { id } = jwtDecode(session.token)

    const formdata = await req.formData()
    const file = await ImageUpload(formdata.get('picture'))


    const rentalExist = await prismaClient.rental.findMany({
        where: {
            userId: id
        }
    })
    if (rentalExist.length == 0) return NextResponse.json("Rental not found", { status: 404 })

    const game = await prismaClient.game.create({
        data: {
            name: formdata.get("name"),
            picture: file,
            description: formdata.get("description"),
            type: formdata.get("type"),
            rentalId: rentalExist[0].id
        }
    })
    if (!game) return NextResponse.json("Failed to create game", { status: 500 })

    return NextResponse.json("game", { status: 200 })
}

export async function PATCH(req) {
    const findGame = await prismaClient.game.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findGame) return NextResponse.json("Playstation not found", { status: 404 })

    const formdata = await req.formData()
    const file = await ImageUpload(formdata.get('picture'))    

    const body = {
        name: formdata.get("name"),
        picture: file,
        description: formdata.get("description"),
        type: formdata.get("type"),
    }

    const game = await prismaClient.game.update({
        where: {
            id: req.nextUrl.searchParams.get("id")
        },
        data: body
    })
    if (!game) return NextResponse.json("Failed to update game", { status: 500 })

    return NextResponse.json("game", { status: 200 })
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