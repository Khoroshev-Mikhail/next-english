import { useSession } from "next-auth/react";
import Header from "./Header";
import Header_admin from "./Header_admin";

export default function Layout({children}){
    const { data: session } = useSession()
    return (
        <>
            <Header />
            <div className="container mx-auto min-h-screen  text-black text-lg">
                {session?.user.role === 'ADMIN' && <Header_admin />}
                <div className="pt-4">
                    {children}
                </div>
            </div>
        </>
    )
}