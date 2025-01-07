import { prismaClient } from "@/database/prismaClient"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req) {
    console.log("get");
    
    const playStation = await prismaClient.playStation.findMany()
    
    return new NextResponse(playStation, { status: 200 })
}

export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })

    const { id } = jwtDecode(session.token)
    
    const rentalExist = await prismaClient.rental.findMany({
        where: {
            userId: id
        }
    })
    if(rentalExist.length == 0) return new NextResponse("Rental not found", { status: 404 })
    
    const playStation = await prismaClient.playStation.create({
        data: {
            name: req.name,
            type: req.type,
            description: req.description,
            price: req.price,
            rentalId: rentalExist[0].id
            
        }
    })
    if(!playStation) return new NextResponse("Failed to create playstation", { status: 500 })

    return new NextResponse(playStation, { status: 200 })
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
    if(!findPlayStation) return new NextResponse("Playstation not found", { status: 404 })
        
    const playStation = await prismaClient.playStation.update({
        where: {
            id: req.id
        },
        data: body
    })
    if(!playStation) return new NextResponse("Failed to update playstation", { status: 500 })

    return new NextResponse(playStation, { status: 200 })
}

export async function DELETE(req) {
    const findPlayStation = await prismaClient.playStation.findFirst({
        where: {
            id: req.id
        }
    })
    if(!findPlayStation) return new NextResponse("Playstation not found", { status: 404 })
    
    const playStation = await prismaClient.playStation.delete({
        where: {
            id: req.id
        }
    })
    if(!playStation) return new NextResponse("Failed to delete playstation", { status: 500 })

    return new NextResponse(playStation, { status: 200 })
}