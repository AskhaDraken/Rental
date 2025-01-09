import { prismaClient } from "@/database/prismaClient";
import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })

    const { id } = jwtDecode(session.token)

    const findUserById = await prismaClient.user.findFirst({
        where: {
            id: id
        },
        omit: {
            id: true,
            password: true,
            role:true,
            createdAt: true,
            updatedAt: true
        }
    })

    return NextResponse.json(findUserById, {status: 200})
}

export async function PATCH(req) {
    const body = await req.json()

    
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)

    const findUserById = await prismaClient.user.findFirst({
        where: {
            id: id
        },
    })
    if(!findUserById) return NextResponse.json("User not found", {status: 404})

    const updateProfil = await prismaClient.user.update({
        where: {
            id: id
        },
        data: body
    })
    if(!updateProfil) return NextResponse.json("Update Fail", {status: 500})

    return NextResponse.json("Success update", {status: 200})
}