import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { DELAY, ENGLISH } from 'lib/errors'
import { speechText } from 'lib/fns'
import Image from 'next/image'

type Data = { id: number, eng: string, rus: string, answers: string[] }
export default function English(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading, isValidating } = useSWR<Data[]>(id ? `/api/groups/${id}/english` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/english/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ isGoodAnswer, setAnswer ] = useState<boolean>(null)
    const [ isSoundOn, setIsSoundOn ] = useState<boolean>(true)
    const { cache } = useSWRConfig()
    
    useEffect(()=>{
        setI(0)
    }, [data])

    useEffect(()=>{
        if(isSoundOn && !isLoading && !isValidating && data && data[i]){
            speechText(data[i].eng)
        }
    }, [i, data])

    useEffect(()=>{
        return () => {
            cache.delete(`/api/groups/${id}/english`)
        }
    },[])

    async function answer(word_id: number, rus: string){
        setAnswer(data[i].rus == rus ? true : false)
        if(data[i].rus === rus){
            trigger({ method: ENGLISH, word_id })
        }
        //audio
        setTimeout(() => {
            setI(state => state + 1)
            setAnswer(null)
        }, DELAY)
    }

    return(
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4">
            <div className='flex justify-end'>
                <Image src={isSoundOn ? '/images/speaker-wave.svg' : '/images/speaker-x-mark.svg'} alt={isSoundOn ? 'sound ON' : 'sound OFF'} onClick={()=>setIsSoundOn(!isSoundOn)} width={20} height={20} className="cursor-pointer"/>
            </div>
            <div className='flex justify-center'>
                <h3 className="text-center text-2xl font-extrabold p-2">{ data && data[i].eng }</h3>
            </div>
            { data && data[i].answers.map((rus, i) => {
                return (
                    <button
                        key={i}
                        onClick={ (e)=> answer(data[i].id, rus)}
                        className={`${isGoodAnswer === false && 'bg-red-500'} ${isGoodAnswer === true && 'bg-sky-500'} block shadow-md h-12 my-2 border-solid duration-500 border-2 text-lg font-medium rounded-md outline-none`}
                    >
                        {rus}
                    </button>
                )
            })}
        </div>
    )
}