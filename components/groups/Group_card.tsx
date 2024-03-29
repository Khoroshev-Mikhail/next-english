import { Button, Progress, Spinner } from "flowbite-react";
import Link from "next/link";
import useSWR from 'swr'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Group } from "@/pages/groups";


export default function Group_card({ id, eng, rus, words, _count }: Group){
    const { data: session } = useSession()
    const { data } = useSWR(id ? `/api/groups/${id}/progress` : null)
    const { data: english } = useSWR(`/api/user/vocabulary/english/`)
    const { data: russian } = useSWR(`/api/user/vocabulary/russian/`)
    const { data: auding } = useSWR(`/api/user/vocabulary/auding/`)
    const { data: speaking } = useSWR(`/api/user/vocabulary/speaking/`)
    useEffect(()=>{
        AOS.init()
    }, [])
    return (
        <div data-aos="fade-up" data-aos-duration="1500" className="p-2 block truncate col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 rounded-xl border-2 border-gray grid grid-cols-6 text-center shadow-md">
            <h3 className="col-span-6 text-md sm:text-xl md:text-2xl font-extrabold mx-4 py-4 border-b-2 truncate h-[56px]">
                <Link href={`/groups/${id}`}>
                    {eng}
                </Link>
            </h3>
            {session?.user?.id &&
                (data 
                    ?
                        <div className="col-span-6 p-2 text-center truncate text-xs sm:text-sm md:text-base">
                            <Progress progress={words.filter(el => english?.includes(el.id)).length || 0} label="Перевод с Английского" labelPosition="outside"></Progress>
                            <Progress progress={words.filter(el => russian?.includes(el.id)).length || 0} label="Перевод с Русского" labelPosition="outside"></Progress>
                            <Progress progress={words.filter(el => auding?.includes(el.id)).length || 0} label="Аудирование" labelPosition="outside"></Progress>
                            <Progress progress={words.filter(el => speaking?.includes(el.id)).length || 0} label="Произношение" labelPosition="outside"></Progress>
                        </div>
                    :
                        <div className="col-span-6 p-2 text-center h-[168px] flex flex-col justify-center">
                            <Spinner size='xl' color='gray'/>
                        </div>)
            }
            <div className="col-span-6 pt-2 text-center flex justify-center text-xs sm:text-sm md:text-base">
                <span>Слов в карточке: {_count.words}</span>
            </div>
            <div className="col-span-6 py-2 text-center flex justify-center">
                <Link href={`/groups/${id}`} className={(data && data.english >= 100 && data.russian >= 100 && data.auding >= 100 && data.speaking >= 100) ? 'pointer-events-none' : ''} onClick={ session?.user?.id ? undefined : ()=>signIn() }><Button>Go</Button></Link>
            </div>
        </div>
    )
}