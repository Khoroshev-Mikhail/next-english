import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useRef, useState } from 'react'
import { Button, Spinner, TextInput } from 'flowbite-react'
import { AUDING, BG_SUCCESS, DELAY } from 'lib/errors'
import { speechText, ucFirst } from 'lib/fns'
import Image from 'next/image'
import Head from 'next/head'

export default function Auding(){
    const router = useRouter()
    const { id } = router.query
    const { cache } = useSWRConfig()
    const input = useRef(null)
    const success_ring = new Audio('/audio/success.mp3')

    const { data, error, isLoading, isValidating } = useSWR<{ id: number, eng: string, rus: string }[]>(id ? `/api/groups/${id}/auding` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/auding/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ goodAnswers, setGoodAnswers ] = useState<number[]>([])
    const [ answer, setAnswer ] = useState<string>('')

    useEffect(()=>{
        if(data && data[i]?.eng.toLowerCase() === answer.toLowerCase()){
            success_ring.play()
            setGoodAnswers(state => state.concat(data[i].id))
            trigger({ method: AUDING, word_id: data[i].id })
            setTimeout(() => { 
                if(i < data.length - 1){
                    setI(state => state + 1)
                } 
                else if(new Set(goodAnswers).size < data.length){
                    const index = data.findIndex(el => !goodAnswers.includes(el.id))
                    if(index >= 0){
                        setI(index)
                    }
                } 
                
            }, DELAY)
        }
    }, [ answer, data, i ])
    useEffect(()=>{
        setAnswer('')
    }, [ i ])
    useEffect(()=>{
        setI(0)
    }, [ data ])
    useEffect(()=>{
        if(data && data[i]){
            input?.current?.focus()
            speechText(data[i].eng)
        }
    }, [ i, data ])
    useEffect(()=>{
        return () => {
            cache.delete(`/api/groups/${id}/auding`)
        }
    },[ ])

    return(
        <div className={`${data && goodAnswers.includes(data[i]?.id) && BG_SUCCESS} w-[96%] mx-auto min-h-[100px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <title>Аудирование</title>
            </Head>
            {isLoading &&
                <div className='w-full h-full min-h-[148px] flex flex-col justify-center text-center'>
                    <Spinner />
                </div>
            }
            {/* вынести в компонент */}
            {data && data.length === 0 && 
                <h3 className="text-center text-2xl font-extrabold p-2">
                    Все слова выучены
                </h3>
            }
            {!isLoading && data && data.length > 0 && 
            <>
                <div className='flex justify-center' onClick={()=>speechText(data[i]?.eng)}>
                    <h3 className="text-center text-2xl font-extrabold p-2">
                        { data && ucFirst(data[i]?.rus) } <Image src={'/images/speaker-wave.svg'} alt='(sound)' width={20} height={20} className="inline"/>
                    </h3>
                </div>
                <div className='flex justify-center pb-2'>
                    <TextInput autoFocus ref={input} className='text-lg w-full text-center' disabled={goodAnswers.includes(data[i].id)} value={goodAnswers.includes(data[i].id) ? data[i].eng : answer} onChange={(e)=>setAnswer(e.target.value)}/>
                </div>
                <div className='flex justify-between mt-2'>
                    <Button color='gray' onClick={()=> setI(i => i - 1) } disabled={i <= 0}>
                        <Image src={'/images/arrow-left.svg'} alt='<' width={20} height={20}/>
                    </Button>
                    <Button color='gray' onClick={()=> setI(i => i + 1) } disabled={i >= data.length - 1}>
                        <Image src={'/images/arrow-right.svg'} alt='<' width={20} height={20}/>
                    </Button>
                </div>
            </>
            }
        </div>
    )
}

Auding.auth = true