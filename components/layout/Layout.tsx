import Header from "./Header";
import Header_admin from "./Header_admin";
import bg from '../../public/images/background.jpg'

export default function Layout({children}){
    return (
        <div className="container mx-auto min-h-screen  text-black text-lg ">
            <Header_admin />
            <Header />
            <div className="pt-4">
                {children}
            </div>
        </div>
    )
}