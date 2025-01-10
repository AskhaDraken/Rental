import { prismaClient } from "@/database/prismaClient"
import * as bcrypt from 'bcrypt'
import { NextResponse } from "next/server"

export async function POST(req) {

    const body = await req.json()


    const finduserExist = await prismaClient.user.findFirst({
        where: {
            OR: [
                { email: body.email },
                { phone: body.phone },
            ]
        }
    })
    

    if (finduserExist !== null) {
        return NextResponse.json(
            {
                message: "User Already Exist"
            }, { status: 409 })
    }

    const passwordEncrypt = await bcrypt.hashSync(body.password, 10)

    const user = await prismaClient.user.create({
        data: {
            fullname: body.username,
            email: body.email,
            phone: body.phone,
            password: passwordEncrypt
        },
        omit: {
            password: true,
            role: true
        }
    })

    // const user = {}

    if (!user) {
        return NextResponse.json(
            {
                message: "User Not Created"
            })
    }

    return NextResponse.json(
        {
            message: "User Created",
            data: user
        })


}