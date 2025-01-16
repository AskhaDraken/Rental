import { prismaClient } from "@/database/prismaClient"
import { NextResponse } from "next/server"

export async function GET(req) {
    const date = new Date()
    const transaction = await prismaClient.transaction.findMany({
        where: {
            status: 'success',
            OR: [
                {
                    isConfirm: 'accept',
                },
                {
                    isConfirm: 'invalid',
                },
                {
                    isConfirm: 'reject',
                },
            ],
        }
    })

    return NextResponse.json(transaction, { status: 200 })
}
