import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export default function withAuth(middleware, reqAuth) {
    return async (req, next) => {
        const pathname = req.nextUrl.pathname
        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET_KEY })
        
        if(
            reqAuth.includes(pathname) ||
            pathname.startsWith("/management")
        ) {
            if(session) {
                const role = jwtDecode(session.token).role
                
                if(role === "user" && (pathname.startsWith("/management") || pathname.startsWith("/dashboard"))) {
                    return NextResponse.redirect(new URL("/", req.url))
                }
            } else {
                return NextResponse.redirect(new URL("/login", req.url))
            }
        }

        return middleware(req, next)
    }
}