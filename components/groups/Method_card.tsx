import { Button, Progress } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from 'swr'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { BG_SUCCESS } from "lib/errors";

export default function Method_card({ method, header } : { method: string, header: string }){
    const router = useRouter()
    const { id } = router.query
    const { data } = useSWR(id ? `/api/groups/${id}/progress` : null)
    const { data: session } = useSession()
    function isCompleted(){
        return (data && method == 'english' && data.english >= 100)
        || (data && method == 'russian' && data.russian >= 100)
        || (data && method == 'auding' && data.auding >= 100 )
        || (data && method == 'speaking' && data.speaking >= 100)
    }
    useEffect(()=>{
        AOS.init()
    }, [])
    return (
        <div data-aos="fade-up" data-aos-duration="1000" className={`block truncate col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 rounded-xl border-2 border-gray grid grid-cols-6 text-center shadow-md`}>
            <h3 className="col-span-6 text-md sm:text-xl md:text-xl 2xl:text-2xl font-extrabold mx-4 py-4 truncate h-[56px]">
                <Link href={`${id}/${method}`} className={isCompleted() ? 'pointer-events-none' : ''} >
                    { header }
                </Link>
            </h3>
            <div className="col-span-6 p-2 text-center truncate text-xs sm:text-sm md:text-base">
                { method === 'english' && <Progress progress={data?.english || 0}></Progress> }
                { method === 'russian' && <Progress progress={data?.russian || 0}></Progress> }
                { method === 'auding' && <Progress progress={data?.auding || 0}></Progress> }
                { method === 'speaking' && <Progress progress={data?.speaking || 0}></Progress> }
            </div>
            <div className="col-span-6 py-2 text-center flex justify-center">
                <Link 
                    href={`${id}/${method}`} 
                    className={isCompleted() ? 'pointer-events-none' : ''} 
                    onClick={ session?.user?.id ? undefined : ()=>signIn() } 
                >
                    <Button className={isCompleted() && BG_SUCCESS} >
                        {isCompleted() ? 'Сompleted' : 'Go'}
                    </Button>
                </Link>
            </div>
        </div>    
    )
}