import { useRouter } from 'next/router'
import useSWR from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'

type Data = { id: number, eng: string, rus: string, answers: { id: number, rus: string }[] }

export default function English(){
    const router = useRouter()
    const { id } = router.query
    //Этот запрос должен происходить в одном
    const { data, error, isLoading, mutate } = useSWR<Data>(id ? `/api/studying/${id}/english/` : null)
    const { trigger } = useSWRMutation(id ? `/api/studying/${id}/english/` : null, updateFetch)
    const [ preloadData, setPreloadData ] = useState<Data>()
    const [ isSuccess, setSuccess ] = useState<boolean>(true)
    useEffect(()=>{
        if(isSuccess){
            setPreloadData(data)
        }
    },[data, isSuccess])

    async function goodAnswer(word_id: number){
        
        await trigger({ method: 'ENGLISH', word_id })
    }
    async function badAnswer(){
        
        await mutate() 
        
    }
    return(
        <div className="w-full sm:w-1/2 mx-auto grid grid-cols-6 p-4 rounded-lg border-2">
            <div className='col-span-6 flex justify-center border-b-2'>
                <h3 className="text-center text-2xl font-extrabold  p-4">{ preloadData?.eng }</h3>
            </div>
            
            { preloadData?.answers.map((el, i) => {
                return (
                    <button
                        key={i}
                        onClick={(e)=>el.rus === data.rus ? goodAnswer(data.id) : badAnswer()}
                        className={`block col-span-6 h-12 my-2 bg-transparent hover:bg-sky-100 border-solid  duration-500 hover:duration-500 border-2 text-lg font-medium rounded-md outline-none`}
                    >
                        {el.rus}
                    </button>
                )
            })}
        </div>
    )
}