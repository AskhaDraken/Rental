import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import { MidtransClient } from "midtrans-node-client"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
    
    const { id } = jwtDecode(session.token)

    
    // check order
    const checkOrderExist = await prismaClient.transaction.findFirst({
        where: {
            status: "success",
            date: req.date,
        }
    })
    if (checkOrderExist) return new NextResponse.json("Checkout failed", { status: 500 })

    const findUser = await prismaClient.user.findFirst({
        where: {
            id: id
        }
    })
    if (!findUser) return new NextResponse.json("User not found", { status: 404 })

    const findRental = await prismaClient.rental.findFirst({
        where: {
            id: req.rentalId
        }
    })
    if (!findRental) return new NextResponse.json("Rental not found", { status: 404 })

    const findTvId = await prismaClient.tv.findFirst({
        where: {
            AND: {
                id: req.tvId,
                rentalId: req.rentalId
            }
        }
    })
    if (!findTvId) return new NextResponse.json("Product not found", { status: 404 })

    const findPs = await prismaClient.playStation.findFirst({
        where: {
            id: findTvId.psId,
        }
    })
    if (!findPs) return new NextResponse.json("Playstation not found", { status: 404 })

    // Create token midtrans

    const snap = new MidtransClient.Snap({
        isProduction: process.env.NEXTAUTH_ISPRODUCTION,
        clientKey: process.env.CLIENT_KEY,
        serverKey: process.env.SERVER_KEY
    })

    const fullname = findUser.fullname.split(" ")
    const data = await req.json()

    

    const token = await snap.createTransactionToken({

        item_details: {
            name: findPs.name,
            price: findPs.price,
            quantity: data.jam.length,
            category: findPs.type
        },
        transaction_details: {
            order_id: Math.random(),
            gross_amount: findPs.price * data.jam.length
        },
        customer_details: {
            first_name: fullname[0],
            last_name: fullname[fullname.length - 1],
            email: findUser.email,
            phone: findUser.phone
        },
    }).catch((err) => {
        console.log(err);
        
    })
    if(!token) return new NextResponse.json("Checkout failed", { status: 500 })

    const date = new Date()
    
    const checkout = await prismaClient.transaction.create({
        data: {
            rentalId: data.rentalId,
            tvId: data.tvId,
            userId: id,
            date: date.toLocaleDateString(),
            time: data.jam,
            snapToken: token
        }
    })

    if (!checkout) return new NextResponse.json("Checkout failed", { status: 500 })

    return new NextResponse.json("Checkout success", { status: 201 })
}