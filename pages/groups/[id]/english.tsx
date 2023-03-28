import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { DELAY, ENGLISH } from 'lib/errors'
import { speechText } from 'lib/fns'
import Image from 'next/image'
import { Button, Spinner } from 'flowbite-react'

type Data = { id: number, eng: string, rus: string, answers: string[] }
export default function English(){
    const router = useRouter()
    const { id } = router.query
    const { cache } = useSWRConfig()
    
    const { data, error, isLoading, isValidating } = useSWR<Data[]>(id ? `/api/groups/${id}/english` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/english/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ answers, setAnswers ] = useState([])
    const [ isGoodAnswer, setAnswer ] = useState<boolean>(null)
    
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
            cache.delete(`/api/groups/${id}/english`)
        }
    },[])

    async function answer(word_id: number, rus: string){
        setAnswer(data[i].rus == rus ? true : false)
        if(data[i].rus === rus){
            setAnswers(arr => arr.concat(word_id))
            trigger({ method: ENGLISH, word_id })
        }
        setTimeout(() => {
            setI(state => state + 1)
            setAnswer(null)
        }, DELAY)
    }

    return(
        <div className="w-full min-h-[354px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4">
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
                    { data && data[i]?.eng } <Image src={'/images/speaker-wave.svg'} alt='(sound)' width={20} height={20} className="inline"/>
                </h3>
                </div>
                { data && data[i]?.answers.map((rus, index) => {
                    return (
                        <button
                            disabled={answers.includes(data[i].id)}
                            key={index}
                            onClick={ (e)=> answer(data[i].id, rus)}
                            className={`${isGoodAnswer === false && 'bg-red-500'} ${isGoodAnswer === true && 'bg-sky-500'} block  h-12 my-2 border-solid duration-500 border text-lg font-medium rounded-md outline-none`}
                        >
                            {rus}
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