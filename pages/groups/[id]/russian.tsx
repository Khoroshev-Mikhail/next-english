import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { DELAY, RUSSIAN } from 'lib/errors'
import { speechText } from 'lib/fns'

type Data = { id: number, eng: string, rus: string, answers: string[] }

export default function Russian(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading, isValidating } = useSWR<Data[]>(id ? `/api/groups/${id}/russian` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/russian/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ isGoodAnswer, setAnswer ] = useState<boolean>(null)
    
    useEffect(()=>{
        setI(0)
    }, [ data ])

    async function answer(word_id: number, eng: string){
        setAnswer(data[i].eng == eng ? true : false)
        if(data[i].eng === eng){
            speechText(data[i].eng)
            trigger({ method: RUSSIAN, word_id })
        }
        setTimeout(() => {
            setI(state => state + 1)
            setAnswer(null)
        }, DELAY)
    }
    return(
        <div className="w-full sm:w-1/2 mx-auto grid grid-cols-6 p-4 rounded-lg border-2">
            <div className='col-span-6 flex justify-center border-b-2'>
                <h3 className="text-center text-2xl font-extrabold  p-4">{ data && data[i].rus }</h3>
            </div>
            
            { data && data[i].answers.map((eng, i) => {
                return (
                    <button
                        key={i}
                        onClick={ (e)=> answer(data[i].id, eng)}
                        className={`${isGoodAnswer === false && 'bg-red-500'} ${isGoodAnswer === true && 'bg-sky-500'} block col-span-6 h-12 my-2 border-solid duration-500 border-2 text-lg font-medium rounded-md outline-none`}
                    >
                        {eng}
                    </button>
                )
            })}
        </div>
    )
}