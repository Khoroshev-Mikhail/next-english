import Button from "components/UI/buttons";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo from '../../public/images/eng.png'

export default function HeaderLatest(){
    const { data: session } = useSession()
    return (
        <header className="w-full py-4 px-20 flex justify-between items-center z-99 shadow-md">
            <h1 className="text-4xl font-extrabold  select-none"><Image src={logo.src} width={50} height={40} alt='logo'/></h1>
            <nav>
                <Link href="/groups" className="relative  text-lg no-underline font-medium ml-10 mylink">Слова</Link>
                {/* <Link href="#" className="relative  text-lg no-underline font-medium ml-10 mylink">Тексты</Link>
                <Link href="#" className="relative  text-lg no-underline font-medium ml-10 mylink">Грамматика</Link> */}
                {session?.user 
                    ? <Link href="/user" className="relative  text-lg no-underline font-medium ml-10 mylink">Профиль</Link>
                    : <Button text={'Войти'} fn={signIn}/>
                }
            </nav>
        </header>
    )
}