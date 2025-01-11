import { prismaClient } from "@/database/prismaClient";
import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)

    return NextResponse.json(
        await prismaClient.rental.findMany({
            where: {
                userId: id
            }
        }),
        {
            status: 200
        }
    )
}

export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)

    const body = await req.json()
    const rental = await prismaClient.rental.create({
        data: {
            userId: id,
            name: body.name,
            picture: "",
            description: body.description,
            alamat: body.alamat,
            mapurl: body.mapurl,
            open: body.open,
            close: body.close,

        }
    })

    if (!rental) return NextResponse.json("Failed to create rental", { status: 500 })

    return NextResponse.json(rental, { status: 200 })
}

export async function PATCH(req) {
    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findRentalExist) return NextResponse.json("Rental not found", { status: 404 })

    const rental = await prismaClient.rental.update({
        where: {
            id: req.nextUrl.searchParams.get("id")
        },
        data: await req.json()
    })
    if (!rental) return NextResponse.json("Failed to update rental", { status: 500 })


    return NextResponse.json(rental, { status: 200 })

}

export async function DELETE(req) {
    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!findRentalExist) return NextResponse.json("Rental not found", { status: 404 })

    const rental = await prismaClient.rental.delete({
        where: {
            id: req.nextUrl.searchParams.get("id")
        }
    })
    if (!rental) return NextResponse.json("Failed to delete rental", { status: 500 })
        
    return NextResponse.json(rental, { status: 200 })
}