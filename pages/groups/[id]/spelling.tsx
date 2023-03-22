import { useRouter } from 'next/router'
import useSWR from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { Button, Spinner,} from 'flowbite-react'
import { SPELLING } from 'lib/errors'


export default function Spelling(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useSWR<{ id: number, eng: string, rus: string }[]>(id ? `/api/groups/${id}/spelling` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/spelling/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ answer, setAnswer ] = useState<string[]>([])
    const [ eng, setEng ] = useState<string[]>([])
    
    function clickEng(i: number){
        setEng(state => {
            const currentLetter = state.splice(i, 1)[0]
            setAnswer(state => state.concat(currentLetter))
            return state
        })
    }
    function clickAnswer(i: number){
        setAnswer(state => {
            const currentLetter = state.splice(i, 1)[0]
            setEng(state => state.concat(currentLetter))
            return state
        })
    }

    useEffect(()=>{
        if(data && data[i]){
            setEng( data[i].eng.toUpperCase().split('').sort( () => Math.random() - 0.5 ) )
        }
    }, [ data, i ])
    useEffect(()=>{
        if(data && data[i]?.eng.toUpperCase() == answer.join('')){
            trigger({ method: SPELLING, word_id: data[i].id })
            setTimeout(() => { 
                setI(state => state + 1) 
                setAnswer([])
            }, 1000)
        }
    }, [ answer, data, i ])
    useEffect(()=>{
        setI(0)
    }, [ data ])

    return(
        <div className="w-full sm:w-1/2 mx-auto grid grid-cols-6 p-4 rounded-lg border-2">
            <div className='col-span-6 flex justify-center border-b-2'>
                <h3 className="text-center text-2xl font-extrabold  p-4">{ (data && data[i].rus) || <Spinner /> }</h3>
            </div>
            <div className="col-span-6 flex flex-wrap gap-1 justify-center mb-10 p-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                {answer.map((el: string, i: number) => {
                    return (
                        <div key={i} className="font-bold">
                            <Button color="gray" onClick={()=>clickAnswer(i)}>
                                {el}
                            </Button>
                        </div>
                    )
                })}
            </div>
            <div className="col-span-6 flex flex-wrap gap-1 justify-center mb-10 p-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                { eng.map((el: string, i: number) => {
                    return (
                        <div key={i}>
                            <Button color="gray" onClick={()=>clickEng(i)}>
                                {el}
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}