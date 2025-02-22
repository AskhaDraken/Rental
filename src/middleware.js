import { NextResponse } from "next/server"
import withAuth from "./middleware/withAuth"

export async function mainMiddleware(req) {
    return NextResponse.next()
}

export default withAuth(mainMiddleware,
    [
        "/profil",
        "/booking",
        "/dashboard",
        "/riwayat",
        "/transaksi",
        "/management"
    ]
)