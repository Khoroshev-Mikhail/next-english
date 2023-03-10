import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from '../../../lib/prismadb';
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.role = user.role;
                token.id = user.id
            }
            return token;
        },
        session({ session, token, user }) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.id = token.id
            }
            if(user){
                session.user.role = user.role
                session.user.id = user.id
            }
            return session;
        },
      },
}
export default NextAuth(authOptions)
