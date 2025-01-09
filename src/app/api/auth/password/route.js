import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'

export async function PATCH(req) {
    const body = await req.json()
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)

    const findUserById = await prismaClient.user.findFirst({
        where: {
            id: id
        },
    })
    if (!findUserById) return NextResponse.json("User not found", { status: 404 })

    const passwordEncrypt = await bcrypt.hashSync(body.password, 10)

    const updatePassword = await prismaClient.user.update({
        where: {
            id: id
        },
        data: {
            password: passwordEncrypt
        }
    })
    if (!updatePassword) return NextResponse.json("Update Fail", { status: 500 })

    return NextResponse.json("Success Update Password", { status: 200 })

}