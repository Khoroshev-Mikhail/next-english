import Header from "./Header";
import Header_admin from "./Header_admin";

export default function Layout({children}){
    return (
        <div className="container mx-auto">
            <Header_admin />
            <Header />
            <div className="pt-4">
                {children}
            </div>
        </div>
    )
}