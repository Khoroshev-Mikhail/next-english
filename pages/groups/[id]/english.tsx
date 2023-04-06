import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { BG_ERROR, BG_SUCCESS, DELAY, ENGLISH } from 'lib/errors'
import { speechText, ucFirst } from 'lib/fns'
import Image from 'next/image'
import { Button, Spinner } from 'flowbite-react'
import Head from 'next/head'

type Data = { id: number, eng: string, rus: string, answers: string[] }

export default function English(){
    const router = useRouter()
    const { id } = router.query
    const { cache } = useSWRConfig()
    // const [ audio ] = useState(new Audio('/audio/success.mp3'))

    const { data, error, isLoading, isValidating, mutate } = useSWR<Data[]>(id ? `/api/groups/${id}/english` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/english/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ goodAnswers, setGoodAnswers ] = useState<number[]>([])
    const [ badAnswers, setBadAnswers ] = useState<number[]>([])
    
    function attempt(word_id: number, rus: string){
        if(data[i].rus.toLowerCase() === rus.toLowerCase()){
            // audio.pause()
            // audio.currentTime = 0
            // audio.play()
            trigger({ method: ENGLISH, word_id })
            setGoodAnswers(state => state.concat(word_id))
        }
        if(data[i].rus.toLowerCase() !== rus.toLowerCase()){
            setBadAnswers(state => state.concat(word_id))
        }
        setTimeout(() => {
            if(i === 0){
                speechText(data[i].rus) //костыль для телефонов
            }
            if(i < data.length - 1){
                setI(state => state + 1)
            } 
            else if(new Set(goodAnswers).size + new Set(badAnswers).size < data.length){
                const index = data.findIndex(el => !goodAnswers.includes(el.id) && !badAnswers.includes(el.id))
                if(index >= 0){
                    setI(index)
                }
                if(index < 0){
                    mutate()
                }
            } 
        }, DELAY)
    }
    
    useEffect(()=>{
        setI(0)
        setGoodAnswers([])
        setBadAnswers([])
    }, [ data ])
    useEffect(()=>{
        if(data && data[i]){
            speechText(data[i].eng)
        }
    }, [ i, data ])
    useEffect(()=>{
        return () => {
            cache.delete(`/api/groups/${id}/english`)
        }
    },[ ])

    return(
        <div className={`${data && goodAnswers.includes(data[i]?.id) && BG_SUCCESS} w-[96%] mx-auto min-h-[354px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <title>Перевод с Английского</title>
            </Head>
            {isLoading &&
                <div className='w-full h-full min-h-[354px] flex flex-col justify-center text-center'>
                    <Spinner />
                </div>
            }
            {data && data.length === 0 && 
                <h3 className="text-center text-2xl font-extrabold p-2">
                    Все слова выучены
                </h3>
            }
            {!isLoading && data && data.length > 0 &&
            <>  
                <div className='cursor-pointer flex justify-center' onClick={()=>speechText(data[i]?.eng)}>
                    <h3 className="text-center text-2xl font-extrabold p-2">
                        { data && ucFirst(data[i]?.eng) } <Image src={'/images/speaker-wave.svg'} alt='(sound)' width={20} height={20} className="inline"/>
                    </h3>
                </div>
                {data[i].answers.map((rus, index) => {
                    return (
                        <button
                            disabled={ badAnswers.includes(data[i].id) || goodAnswers.includes(data[i].id) }
                            key={index}
                            onClick={ ()=> attempt(data[i].id, rus) }
                            className={`${badAnswers.includes(data[i].id) && data[i].rus.toLowerCase() != rus.toLowerCase() && BG_ERROR} ${(goodAnswers.includes(data[i].id) || badAnswers.includes(data[i].id)) && data[i].rus.toLowerCase() == rus.toLowerCase() && BG_SUCCESS} block  h-12 my-2 border-solid duration-500 border text-lg font-medium rounded-md outline-none`}
                        >
                            { ucFirst(rus) }
                        </button>
                    )
                })}
                <div className='flex justify-between mt-2'>
                    <Button color='gray' onClick={()=>{ setI(i => i - 1)}} disabled={i <= 0}>
                        <Image src={'/images/arrow-left.svg'} alt='<' width={20} height={20}/>
                    </Button>
                    <Button color='gray' onClick={()=>{ setI(i => i + 1)}} disabled={i >= data.length - 1}>
                        <Image src={'/images/arrow-right.svg'} alt='<' width={20} height={20}/>
                    </Button>
                </div>
            </>
            }
        </div>
    )
}
English.auth = true