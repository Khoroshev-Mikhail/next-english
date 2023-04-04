import Header from "./Header";
import Header_admin from "./Header_admin";

export default function Layout({children}){
    return (
        <>
            <Header />
            <div className="container mx-auto min-h-screen  text-black text-lg ">
                <Header_admin />
                <div className="pt-4">
                    {children}
                </div>
            </div>
        </>
    )
}