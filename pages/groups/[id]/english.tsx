import { useRouter } from 'next/router'
import useSWR from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'

type Data = { id: number, eng: string, rus: string, answers: string[] }

export default function English(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useSWR<Data[]>(id ? `http://localhost:3000/api/groups/${id}/english` : null)
    const { trigger } = useSWRMutation(id ? `/api/user/vocabulary/english/` : null, updateFetch)
    const [ i, setI ] = useState<number>(0)
    
    useEffect(()=>{
        setI(0)
    }, [data])

    async function goodAnswer(word_id: number){
        await trigger({ method: 'ENGLISH', word_id })
    }
    async function badAnswer(){
        
    }
    return(
        <div className="w-full sm:w-1/2 mx-auto grid grid-cols-6 p-4 rounded-lg border-2">
            <div className='col-span-6 flex justify-center border-b-2'>
                <h3 className="text-center text-2xl font-extrabold  p-4">{ data?.eng }</h3>
            </div>
            
            { data?.answers.map((el, i) => {
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