import { prismaClient } from "@/database/prismaClient"

export async function GET(req) {
    const findRentalExist = await prismaClient.rental.findFirst({
        where: {
            id: req.id
        }
    })
    if (!findRentalExist) return new NextResponse("Rental not found", { status: 404 })

    
    
    return new NextResponse(jam, { status: 200 })
}