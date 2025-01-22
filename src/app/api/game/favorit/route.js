import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req) {
    const rental = await prismaClient.rental.findMany({
        select: {
            favoritGame: true
        }
    })

    

    return NextResponse.json(
        rental[0],
        {
            status: 200
        }
    )
}

export async function PATCH(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)

    const body = await req.json()

    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            userId: id
        }
    })
    if (!findRentalExist) return NextResponse.json("Rental not found", { status: 404 })

    if (body.type == 'add') {

        findRentalExist.favoritGame.push(req.nextUrl.searchParams.get('id'))

        const rental = await prismaClient.rental.update({
            where: {
                userId: id
            },
            data: {
                favoritGame: findRentalExist.favoritGame
            }
        })
        if (!rental) return NextResponse.json("Failed to update rental", { status: 500 })

        return NextResponse.json(rental, { status: 200 })

    } else if (body.type == 'delete') {

        const index = findRentalExist.favoritGame.indexOf(req.nextUrl.searchParams.get('id'))

        findRentalExist.favoritGame.splice(index, 1)


        const rental = await prismaClient.rental.update({
            where: {
                userId: id
            },
            data: {
                favoritGame: findRentalExist.favoritGame
            }
        })
        if (!rental) return NextResponse.json("Failed to update rental", { status: 500 })


        return NextResponse.json(rental, { status: 200 })
    }

}