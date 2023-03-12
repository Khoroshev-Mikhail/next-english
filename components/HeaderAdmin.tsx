import Link from "next/link";

export default function HeaderAdmin(){
    return (
        <header className="bg-sky-500 top-0 left-0 w-full py-4 px-20 flex justify-between items-center z-99">
            <h1 className="text-2xl font-medium text-white select-none">Админ панель</h1>
            <nav>
                <Link href="/admin/words" className="relative text-white text-lg no-underline font-medium ml-10">Слова</Link>
                <Link href="/admin/groups" className="relative text-white text-lg no-underline font-medium ml-10">Группы</Link>
            </nav>
        </header>
    )
}