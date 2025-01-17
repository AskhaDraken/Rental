import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function PATCH(req) {

    const data = await req.json()

    const findTransactionExist = await prismaClient.transaction.findFirst({
        where: {
            id: req.nextUrl.searchParams.get("id"),
            userId: data.userId
        }
    })
    if (!findTransactionExist) return NextResponse.json("Transaction not found", { status: 404 })

    const transaction = await prismaClient.transaction.update({
        where: {
            id: req.nextUrl.searchParams.get("id"),
            userId: data.userId
        },
        data: {
            isConfirm: 'accept'
        }
    })
    if (!transaction) return NextResponse.json("Failed to update transaction", { status: 500 })
    console.log(data);


    return NextResponse.json("Transaction success", { status: 200 })
}