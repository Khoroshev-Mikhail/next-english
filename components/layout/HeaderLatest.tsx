import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo from '../../public/images/eng.png'

export default function HeaderLatest(){
    const { data: session } = useSession()
    return (
        <header className="w-full min-h-[80px] py-4 md:px-20 px-4 flex justify-between items-center z-99 shadow-md">
            <Link href="/groups" className=""><h1 className="text-4xl font-extrabold  select-none">
                <Image src={logo.src} width={50} height={40} alt='logo' className="inline"/></h1>
            </Link>
            <nav>
                <Link href="/groups" className="relative sm:text-base md:text-lg no-underline font-medium ml-10 mylink">Карточки</Link>
                {/* <Link href="#" className="relative  text-lg no-underline font-medium ml-10 mylink">Тексты</Link>
                <Link href="#" className="relative  text-lg no-underline font-medium ml-10 mylink">Грамматика</Link> */}
                {session?.user 
                    ? <Link href="/user" className="relative sm:text-base md:text-lg no-underline ml-4 md:ml-10 mylink">
                        Профиль
                    </Link>
                    : 
                    <button onClick={()=>signIn()} className="h-12 w-28 bg-transparent hover:bg-sky-100 border-solid  duration-500 hover:duration-500 border-2 text-lg font-medium rounded-md outline-none ml-10">
                        Войти
                    </button>
                }
            </nav>
        </header>
    )
}