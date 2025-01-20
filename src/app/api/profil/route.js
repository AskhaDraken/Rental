import { prismaClient } from "@/database/prismaClient";
import { ImageUpload } from "@/lib/imageUpload";
import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })


    const { id } = jwtDecode(session.token)

    if (req.nextUrl.searchParams.get('id')) {
        return NextResponse.json(
            await prismaClient.user.findFirst({
                where: {
                    id: req.nextUrl.searchParams.get('id')
                },
                omit: {
                    password: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        )
    } else {
        return NextResponse.json(
            await prismaClient.user.findFirst({
                where: {
                    id: id
                },
                omit: {
                    password: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
        )
    }


}

export async function PATCH(req) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    const { id } = jwtDecode(session.token)

    const findUserById = await prismaClient.user.findFirst({
        where: {
            id: id
        },
    })
    if (!findUserById) return NextResponse.json("User not found", { status: 404 })


    const formdata = await req.formData()
    const file = await ImageUpload(formdata.get('picture'))

    const body = {
        picture: file,
        bio: formdata.get('description')
    }

    const updateProfil = await prismaClient.user.update({
        where: {
            id: id
        },
        data: body
    })
    if (!updateProfil) return NextResponse.json("Update Fail", { status: 500 })

    return NextResponse.json("Success update", { status: 200 })
}