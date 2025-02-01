import { prismaClient } from "@/database/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req) {
    const rental = await prismaClient.rental.findMany({
        select: {
            alamat: true,
            mapurl: true
        }
    })
    return NextResponse.json(
        rental[0],
        {
            status: 200
        }
    )
}