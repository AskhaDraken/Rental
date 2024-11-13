import { prismaClient } from "@/database/prismaClient"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
// import { NextAuthOptions } from "next-auth"

const authOption = {
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "username", type: "text", placeholder: "username" },
                password: { label: "password", type: "password", placeholder: "password" },
            },
            async authorize(credentials) {

                const datalogin = {
                    username: 'admin',
                    password: 'admin'
                }
                // Add logic here to look up the user from the credentials supplied
                const generateToken = (payload) => {
                    return jwt.sign(payload, process.env.NEXTAUTH_SECRET_KEY, { expiresIn: '1h' })
                }

                const generateRefreshToken = (payload) => {
                    return jwt.sign(payload, process.env.NEXTAUTH_SECRET_KEY, { expiresIn: '1d' })
                }


                const body = {
                    username: credentials?.username,
                    password: credentials?.password
                }

                const user = await prismaClient.user.findFirst({
                    where: {
                        OR: [
                            {email: body.username},
                            {phone: body.username},
                        ]
                    }
                })

                if(!user) return { message: "User Not-found" }
                
                const passwordMatch = bcrypt.compareSync(body.password, user.password)
                if(!passwordMatch) return { message: "Wrong Password" }

                const payload = {
                    id: user.id,
                    role: user.role
                }

                return {
                    fullname: user.fullname,
                    token: generateToken(payload),
                    refreshToken: generateRefreshToken(payload),
                }
            }
        })
    ],
    // pages: {
    //     signIn: '/login'
    // },
    secret: process.env.NEXTAUTH_SECRET_KEY,
    callbacks: {
        async jwt({ token, user }) {

            return { ...token, ...user }
        },
        async session({ session, token }) {
            console.log(token, "session");
            session.user = token

            return session
        }
    }

}
const handler = NextAuth(authOption)

export { handler as GET, handler as POST }
