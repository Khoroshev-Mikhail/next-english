import { Button, Progress } from "flowbite-react";
import Link from "next/link";
import useSWR from 'swr'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

export default function Group_card({ id, eng, rus, _count } : { id: number, eng: string, rus: string, _count: { words: number} }){
    const { data } = useSWR(id ? `/api/groups/${id}/progress` : null)
    const { data: session } = useSession()
    useEffect(()=>{
        AOS.init()
    }, [])
    return (
        <div data-aos="flip-right" className="block truncate col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 rounded-xl border-2 border-gray grid grid-cols-6 text-center shadow-md">
            <h3 className="col-span-6 text-2xl font-extrabold mx-4 py-4 border-b-2 truncate h-[56px]">
                <Link href={`/groups/${id}`}>
                    {eng}
                </Link>
            </h3>
            {session?.user?.id &&
                <div className="col-span-6 p-2 text-center truncate">
                    <Progress progress={data?.english || 0} label="Перевод с Английского" labelPosition="outside"></Progress>
                    <Progress progress={data?.russian || 0} label="Перевод с Русского" labelPosition="outside"></Progress>
                    <Progress progress={data?.auding || 0} label="Аудирование" labelPosition="outside"></Progress>
                    <Progress progress={data?.speaking || 0} label="Произношение" labelPosition="outside"></Progress>
                </div>
            }
            <div className="col-span-6 pt-2 text-center flex justify-center">
                <span>Слов в карточке: {_count.words}</span>
            </div>
            <div className="col-span-6 py-2 text-center flex justify-center">
                <Link href={`/groups/${id}`} onClick={ session?.user?.id ? undefined : ()=>signIn() }><Button>Учить!</Button></Link>
            </div>
        </div>
    )
}