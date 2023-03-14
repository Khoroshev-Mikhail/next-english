import Link from "next/link";

export default function Header_admin(){
    return (
        <header className="w-full py-4 px-20 flex justify-between items-center z-99">
            <h1 className="text-2xl font-medium text-white select-none">Админ панель</h1>
            <nav>
                <Link href="/admin/words" className="relative text-lg no-underline font-medium ml-10 mylink">Слова</Link>
                <Link href="/admin/groups" className="relative text-lg no-underline font-medium ml-10 mylink">Группы</Link>
            </nav>
        </header>
    )
}