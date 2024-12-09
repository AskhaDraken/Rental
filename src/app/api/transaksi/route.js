import { prismaClient } from "@/database/prismaClient";
import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id, role } = jwtDecode(session.token)

    if (role == "User") {
        const transaction = await prismaClient.transaction.findMany({
            where: {
                userId: id
            }
        })
        
        return new NextResponse(transaction, { status: 200 })
    } else if(role == "Admin") {
        const transaction = await prismaClient.transaction.findMany()
        
        return new NextResponse(transaction, { status: 200 })
    }

}