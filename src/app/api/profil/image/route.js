import { prismaClient } from "@/database/prismaClient"
import { ImageUpload } from "@/lib/imageUpload"
import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function PATCH(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)

    const body = await req.json()
    
    // const file = await ImageUpload(formdata.get('picture'))
    
    const updateProfil = await prismaClient.profile.update({
        where: {
            userId: id
        },
        data: {
            picture: body.picture
        }
    })
    if (!updateProfil) return NextResponse.json("Update Fail", { status: 500 })

    return NextResponse.json("Success update", { status: 200 })

}