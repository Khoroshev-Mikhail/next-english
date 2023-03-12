import Header from "./Header";
import HeaderAdmin from "./HeaderAdmin";

export default function Layout({children}){
    return (
        <div className="container mx-auto">
            <HeaderAdmin />
            <Header />
            <div className="pt-4">
                {children}
            </div>
        </div>
    )
}