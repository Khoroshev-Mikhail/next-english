import Header from "./Header";

export default function Layout({children}){
    return (
        <>
            <Header />
            <div className="container mx-auto min-h-screen  text-black text-lg ">
                {/* <Header_admin /> */}
                <div className="pt-4">
                    {children}
                </div>
            </div>
        </>
    )
}