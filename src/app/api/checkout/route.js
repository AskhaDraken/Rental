import { prismaClient } from "@/database/prismaClient"
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
    if (checkOrderExist) return new NextResponse("Checkout failed", { status: 500 })

    const findUser = await prismaClient.user.findFirst({
        where: {
            id: id
        }
    })
    if (!findUser) return new NextResponse("User not found", { status: 404 })

    const findRental = await prismaClient.rental.findFirst({
        where: {
            id: req.rentalId
        }
    })
    if (!findRental) return new NextResponse("Rental not found", { status: 404 })

    const findTvId = await prismaClient.tv.findFirst({
        where: {
            AND: {
                id: req.tvId,
                rentalId: req.rentalId
            }
        }
    })
    if (!findTvId) return new NextResponse("Product not found", { status: 404 })

    const findPs = await prismaClient.playStation.findFirst({
        where: {
            id: findTvId.psId,
        }
    })
    if (!findPs) return new NextResponse("Playstation not found", { status: 404 })

    // Create token midtrans

    const snap = new MidtransClient.Snap({
        isProduction: NEXTAUTH_ISPRODUCTION,
        clientKey: process.env.NEXTAUTH_CLIENT_KEY,
        serverKey: process.env.NEXTAUTH_SERVER_KEY
    })

    const fullname = findUser.fullname.split(" ")

    const token = snap.createTransactionToken({

        item_details: {
            name: findPs.name,
            price: findPs.price,
            quantity: req.jam.length,
            category: findPs.type
        },
        transaction_details: {
            order_id: Math.random(),
            gross_amount: findPs.price * req.jam.length
        },
        customer_details: {
            first_name: fullname[0],
            last_name: fullname[fullname.length - 1],
            email: findUser.email,
            phone: findUser.phone
        },
    }).catch(err => { return new NextResponse("Rental not found " + err, { status: 404 }) })

    const checkout = await prismaClient.transaction.create({
        data: {
            rentalId: req.rentalId,
            tvId: req.tvId,
            userId: id,
            date: req.date,
            time: req.jam,
            snapToken: token
        }
    })

    if (!checkout) return new NextResponse("Checkout failed", { status: 500 })

    return new NextResponse("Checkout success", { status: 201 })
}