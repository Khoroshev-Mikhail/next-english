import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { Spinner, TextInput } from 'flowbite-react'
import { AUDING, DELAY } from 'lib/errors'
import { speechText } from 'lib/fns'


export default function Auding(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading, isValidating } = useSWR<{ id: number, eng: string, rus: string }[]>(id ? `/api/groups/${id}/auding` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/auding/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ answer, setAnswer ] = useState<string>('')
    const { cache } = useSWRConfig()

    useEffect(()=>{
        if(data && data[i]?.eng === answer){
            trigger({ method: AUDING, word_id: data[i].id })
            setTimeout(() => { 
                setI(state => state + 1) 
                setAnswer('')
            }, DELAY)
        }
    }, [answer, data, i])

    useEffect(()=>{
        setI(0)
    }, [data])

    useEffect(()=>{
        if(data && data[i]){
            speechText(data[i].eng)
        }
    }, [i, data])
    
    useEffect(()=>{
        return () => {
            cache.delete(`/api/groups/${id}/auding`)
        }
    },[])
    return(
        <div className="w-full min-h-[340px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4">
            {isLoading &&
                <div className='w-full h-full min-h-[270px] flex flex-col justify-center text-center'>
                    <Spinner />
                </div>
            }
            {!isLoading && data &&
            <>
                <div className='flex justify-center'>
                    <h3 className="text-center text-2xl font-extrabold p-2">
                        { data && data[i].rus }
                    </h3>
                </div>
                <div className='flex justify-center'>
                    <TextInput value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                </div>
                <div className='flex justify-center'>
                    Пагинация
                </div>
            </>
            }
        </div>
    )
}