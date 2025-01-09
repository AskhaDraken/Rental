import { prismaClient } from "@/database/prismaClient";
import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id, role } = jwtDecode(session.token)

    if (role == "user") {
        const transaction = await prismaClient.transaction.findMany({
            where: {
                userId: id
            }
        })
        
        return NextResponse.json(transaction, {status: 200})
        
        return NextResponse.json(transaction, { status: 200 })
    } else if(role == "admin") {
        const transaction = await prismaClient.transaction.findMany()
        
        return NextResponse.json(transaction, { status: 200 })
    }

}