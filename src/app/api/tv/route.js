import { prismaClient } from "@/database/prismaClient"
import { NextResponse } from "next/server"

export async function GET(req) {
    const { searchParams: query } = new URL(req.url)

    const tv = await prismaClient.tv.findMany(
        {
            where: {
                psId: query.get('psId')
            }
        }
    )

    return NextResponse.json(tv, { status: 200 })
}

export async function POST(req) {
    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            userId: req.userId
        }
    })
    if (!findRentalExist) return NextResponse.json("Rental not found", { status: 404 })

    const findPsExist = await prismaClient.playStation.findFirst({
        where: {
            rentalId: findRentalExist.id
        }
    })
    if (!findPsExist) return NextResponse.json("Playstation not found", { status: 404 })

    const tv = await prismaClient.tv.create({
        data: {
            name: req.name,
            nomorUrut: req.nomorUrut,
            description: req.description,
            psId: findPsExist.id,
            rentalId: findRentalExist.id
        }
    })

    if (!tv) return NextResponse.json("Failed to create tv", { status: 500 })

    return NextResponse.json(tv, { status: 200 })
}

export async function PATCH(req) {
    const findTvExist = await prismaClient.tv.findFirst({
        where: {
            id: req.id
        }
    })
    if (!findTvExist) return NextResponse.json("Tv not found", { status: 404 })

    const tv = await prismaClient.tv.update({
        where: {
            id: req.id
        },
        data: req
    })
    if (!tv) return NextResponse.json("Failed to update tv", { status: 500 })

    return NextResponse.json(tv, { status: 200 })
}

export async function DELETE(req) {
    const findTv = await prismaClient.tv.findFirst({
        where: {
            id: req.id
        }
    })
    if (!findTv) return NextResponse.json("Tv not found", { status: 404 })

    const tv = await prismaClient.tv.delete({
        where: {
            id: req.id
        }
    })
    if (!tv) return NextResponse.json("Failed to delete tv", { status: 500 })

    return NextResponse.json(tv, { status: 200 })
}