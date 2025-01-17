import { prismaClient } from "@/database/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req) {

    if (req.nextUrl.searchParams.get("id")) {
        return NextResponse.json(
            await prismaClient.playStation.findFirst({
                where: {
                    id: req.nextUrl.searchParams.get("id")
                }
            }),
            { status: 200 }
        )
    } else {
        
        return NextResponse.json(
            await prismaClient.playStation.findMany(),
            { status: 200 }
        )
    }

}