import { prismaClient } from "@/database/prismaClient"
import { jwtDecode } from "jwt-decode"
import Midtrans from "midtrans-client"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function POST(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })

    const { id, role } = jwtDecode(session.token)

    const data = await req.json()

    const findUser = await prismaClient.user.findFirst({
        where: {
            id: id
        }
    })
    if (!findUser) return new NextResponse.json("User not found", { status: 404 })

    const findRental = await prismaClient.rental.findFirst({
        where: {
            id: data.rentalId
        }
    })
    if (!findRental) return new NextResponse.json("Rental not found", { status: 404 })

    const findTvId = await prismaClient.tv.findFirst({
        where: {
            AND: {
                id: data.tvId,
                rentalId: data.rentalId
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

    const findRoom = await prismaClient.room.findFirst({
        where: {
            id: findTvId.roomId,
        }
    })
    if (!findRoom) return new NextResponse.json("Room not found", { status: 404 })

    // Create token midtrans

    const snap = new Midtrans.Snap({
        isProduction: false,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY,
        serverKey: process.env.NEXT_PUBLIC_SERVER_KEY
    })

    const fullname = findUser.fullname.split(" ")
    
    const token = await snap.createTransactionToken({
        item_details: {
            id: Date.now(),
            name: findPs.name,
            price: findPs.price + findRoom.price,
            quantity: data.jam.length,
            category: findPs.type
        },
        transaction_details: {
            order_id: Date.now(),
            gross_amount: (findPs.price + findRoom.price) * data.jam.length
        },
        customer_details: {
            first_name: fullname[0],
            last_name: fullname[fullname.length - 1],
            email: findUser.email,
            phone: findUser.phone
        },
    })
    

    // Sorting Jam
    data.jam.sort((a, b) => a.id - b.id)

    if (token.data != undefined) return NextResponse.json("Checkout failed", { status: 500 })
    const date = new Date()

    if(role === "admin") {
        const checkout = await prismaClient.transaction.create({
            data: {
                rentalId: data.rentalId,
                tvId: data.tvId,
                userId: id,
                date: date.toLocaleDateString(),
                time: data.jam,
                isConfirm: 'accept',
                status: 'success',
                snapToken: token
            }
        })
    
        if (!checkout) return new NextResponse.json("Checkout failed", { status: 500 })
    
        return NextResponse.json("Checkout success", { status: 201 })
    } else if(role === "user") {
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
    
        return NextResponse.json("Checkout success", { status: 201 })
    }
}