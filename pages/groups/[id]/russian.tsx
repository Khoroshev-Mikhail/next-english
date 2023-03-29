import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { DELAY, RUSSIAN } from 'lib/errors'
import { Button, Spinner } from 'flowbite-react'
import Image from 'next/image'


type Data = { id: number, eng: string, rus: string, answers: string[] }

export default function Russian(){
    const router = useRouter()
    const { id } = router.query
    const { cache } = useSWRConfig()

    const { data, error, isLoading, isValidating } = useSWR<Data[]>(id ? `/api/groups/${id}/russian` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/russian/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ goodAnswers, setGoodAnswers ] = useState<number[]>([])
    const [ badAnswers, setBadAnswers ] = useState<number[]>([])
    
    function attempt(word_id: number, eng: string){
        if(data[i].eng.toLowerCase() === eng.toLowerCase()){
            trigger({ method: RUSSIAN, word_id })
            setGoodAnswers(state => state.concat(word_id))
        }
        if(data[i].eng.toLowerCase() !== eng.toLowerCase()){
            setBadAnswers(state => state.concat(word_id))
        }
        setTimeout(() => {
            setI(state => state + 1)
        }, DELAY)
    }  

    useEffect(()=>{
        setI(0)
        setGoodAnswers([])
        setBadAnswers([])
    }, [ data ])

    useEffect(()=>{
        return () => {
            cache.delete(`/api/groups/${id}/russian`)
        }
    }, [ ])

    return(
        <div className="w-full min-h-[340px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4">
            {isLoading &&
                <div className='w-full h-full min-h-[270px] flex flex-col justify-center text-center'>
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
                <div className='flex justify-center'>
                    <h3 className="text-center text-2xl font-extrabold p-2">
                        { data && data[i]?.rus }
                    </h3>
                </div>
                {data[i].answers.map((eng, index) => {
                    return (
                        <button
                            disabled={ badAnswers.includes(data[i].id) || goodAnswers.includes(data[i].id) }
                            key={index}
                            onClick={ ()=> attempt(data[i].id, eng) }
                            className={`${badAnswers.includes(data[i].id) && data[i].eng.toLowerCase() != eng.toLowerCase() && 'bg-red-500'} ${goodAnswers.includes(data[i].id) && data[i].eng.toLowerCase() == eng.toLowerCase() && 'bg-green-500'} block  h-12 my-2 border-solid duration-500 border text-lg font-medium rounded-md outline-none`}
                        >
                            {eng}
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

Russian.auth = true