import { Button, Progress } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from 'swr'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Method_card({ method, header } : { method: string, header: string }){
    const router = useRouter()
    const { id } = router.query
    const { data } = useSWR(id ? `/api/groups/${id}/progress` : null)
    useEffect(()=>{
        AOS.init()
    }, [])
    return (
        <div data-aos="flip-right" className="block truncate col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 rounded-xl border-2 border-gray grid grid-cols-6 text-center shadow-md">
            <h3 className="col-span-6 text-2xl font-extrabold mx-4 py-4 border-b-2 truncate">
                <Link href={`${id}/${method}`}>
                    { header }
                </Link>
            </h3>
            <div className="col-span-6 p-2 text-center truncate">
                { method === 'english' && <Progress progress={data?.english || 0} label="Перевод с Английского" labelPosition="outside"></Progress> }
                { method === 'russian' && <Progress progress={data?.russian || 0} label="Перевод с Русского" labelPosition="outside"></Progress> }
                { method === 'auding' && <Progress progress={data?.auding || 0} label="Аудирование" labelPosition="outside"></Progress> }
                { method === 'speaking' && <Progress progress={data?.speaking || 0} label="Произношение" labelPosition="outside"></Progress> }
            </div>
            <div className="col-span-6 py-2 text-center flex justify-center">
                <Link href={`${id}/${method}`}><Button>Учить!</Button></Link>
            </div>
        </div>    
    )
}