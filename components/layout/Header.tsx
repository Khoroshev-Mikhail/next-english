import Link from "next/link";

export default function Header(){
    return (
        <header className="bg-sky-500 top-0 left-0 w-full py-4 px-20 flex justify-between items-center z-99">
            <h1 className="text-2xl font-medium text-white select-none">logo</h1>
            <nav>
                <Link href="/groups" className="relative text-white text-lg no-underline font-medium ml-10">Слова</Link>
                <Link href="#" className="relative text-white text-lg no-underline font-medium ml-10">Тексты</Link>
                <Link href="#" className="relative text-white text-lg no-underline font-medium ml-10">Грамматика</Link>
                <Link href="#" className="relative text-white text-lg no-underline font-medium ml-10">Профиль</Link>
                <button className="w-32 h-12 bg-transparent border-solid border-2 rounded-md outline-none ml-10">Login</button>
            </nav>
        </header>
    )
}