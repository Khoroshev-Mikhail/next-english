import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        role: Role
        id: number | string
        english: number[]
    }
    interface Session extends DefaultSession {
        user: User;

    }
}
declare module "next-auth/jwt" {
    interface JWT {
        role: Role
        id?: number | string
        english: number[]
    }
}