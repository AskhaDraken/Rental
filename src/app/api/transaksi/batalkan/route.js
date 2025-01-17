import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function PATCH(req) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)


    const findTransactionExist = await prismaClient.transaction.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id"),
            userId: id
        }
    })
    if (!findTransactionExist) return NextResponse.json("Transaction not found", { status: 404 })

    const transaction = await prismaClient.transaction.update({
        where: {
            id: req.nextUrl.searchParams.get("id")
        },
        data: {
            status: 'invalid',
            isConfirm: 'invalid',
        }
    })
    if (!transaction) return NextResponse.json("Failed to update transaction", { status: 500 })

    return NextResponse.json("Transaction success", { status: 200 })
}