import { prismaClient } from "@/database/prismaClient"

export async function GET(req) {
    const tv = await prismaClient.tv.findMany()
}

export async function POST(req) {
    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            userId: req.userId
        }
    })
    if(!findRentalExist) return new NextResponse("Rental not found", { status: 404 })

    const findPsExist = await prismaClient.playStation.findFirst({
        where: {
            rentalId: findRentalExist.id
        }
    })
    if(!findPsExist) return new NextResponse("Playstation not found", { status: 404 })
    
    const tv = await prismaClient.tv.create({
        data: {
            name: req.name,
            nomorUrut: req.nomorUrut,
            description: req.description,
            psId: findPsExist.id,
            rentalId: findRentalExist.id
        }
    })
    
    if(!tv) return new NextResponse("Failed to create tv", { status: 500 })

    return new NextResponse(tv, { status: 200 })
}

export async function PATCH(req) {
    const findTvExist = await prismaClient.tv.findFirst({
        where: {
            id: req.id
        }
    })
    if(!findTvExist) return new NextResponse("Tv not found", { status: 404 })
    
    const tv = await prismaClient.tv.update({
        where: {
            id: req.id
        },
        data: req
    })
    if(!tv) return new NextResponse("Failed to update tv", { status: 500 })

    return new NextResponse(tv, { status: 200 })
}

export async function DELETE(req) {
    const findTv = await prismaClient.tv.findFirst({
        where: {
            id: req.id
        }
    })
    if(!findTv) return new NextResponse("Tv not found", { status: 404 })
    
    const tv = await prismaClient.tv.delete({
        where: {
            id: req.id
        }
    })
    if(!tv) return new NextResponse("Failed to delete tv", { status: 500 })

    return new NextResponse(tv, { status: 200 })
}