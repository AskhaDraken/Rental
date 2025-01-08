import { prismaClient } from "@/database/prismaClient"
import { NextResponse } from "next/server";

export async function GET(req) {
    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            id: req.id
        }
    })
    if (!findRentalExist) return new NextResponse("Rental not found", { status: 404 })

    console.log(findRentalExist);
    
    return new NextResponse({}, {status: 200})
    // return new NextResponse(jam, { status: 200 })
}