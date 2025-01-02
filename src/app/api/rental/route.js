import { prismaClient } from "@/database/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {

    const rental = await prismaClient.rental.findMany()

    console.log(rental);
    return new NextResponse(JSON.stringify({ data: rental }), { status: 200 })
}

export async function POST(req) {

    const rental = await prismaClient.rental.create({
        data: {
            userId: req.userId,
            name: req.name,
            picture: "",
            description: req.description,
            alamat: req.alamat,
            mapurl: req.mapurl,
            open: req.open,
            close: req.close,

        }
    })

    if (!rental) return new NextResponse("Failed to create rental", { status: 500 })

    return new NextResponse(rental, { status: 200 })
}

export async function PATCH(req) {
    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            id: req.id
        }
    })
    if (!findRentalExist) return new NextResponse("Rental not found", { status: 404 })

    const rental = await prismaClient.rental.update({
        where: {
            id: req.id
        },
        data: req
    })
    if (!rental) return new NextResponse("Failed to update rental", { status: 500 })


    return new NextResponse(rental, { status: 200 })

}

export async function DELETE(req) {
    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            id: req.id
        }
    })
    if (!findRentalExist) return new NextResponse("Rental not found", { status: 404 })

    const rental = await prismaClient.rental.delete({
        where: {
            id: req.id
        }
    })
    if (!rental) return new NextResponse("Failed to delete rental", { status: 500 })
    return new NextResponse(rental, { status: 200 })
}