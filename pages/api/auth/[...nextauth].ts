import NextAuth from "next-auth"
import prisma from '../../../lib/prismadb';
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        VkProvider({
            clientId: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET
          })
    ],
    callbacks: {
        async session({ session, token, user }) {
            if(user){
                session.user.role = user.role
                session.user.id = user.id
            }
            return session;
        },
        async signIn({ account }){
            delete account.user_id
            return true
        }
      },
}
export default NextAuth(authOptions)
