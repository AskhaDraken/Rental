import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function GET(req) {

    if (req.nextUrl.searchParams.get("id")) {
        return NextResponse.json(
            await prismaClient.game.findFirst({
                where: {
                    id: req.nextUrl.searchParams.get("id")
                }
            }),
            { status: 200 }
        )
    } else {
        const game = await prismaClient.game.findMany()
        return NextResponse.json(
            { game: game },
            { status: 200 }
        )
    }
}



