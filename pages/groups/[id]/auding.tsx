import { useRouter } from 'next/router'
import useSWR from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { Spinner, TextInput } from 'flowbite-react'
import { AUDING } from 'lib/errors'


export default function Auding(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading, isValidating } = useSWR<{ id: number, eng: string, rus: string }[]>(id ? `/api/groups/${id}/auding` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/auding/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ answer, setAnswer ] = useState<string>('')

    useEffect(()=>{
        if(data && data[i]?.eng === answer){
            trigger({ method: AUDING, word_id: data[i].id })
            setTimeout(() => { setI(state => state + 1) }, 1000)
        }
    }, [answer, data, i])

    useEffect(()=>{
        setI(0)
    }, [data])

    useEffect(()=>{
        //отрефактори
        //При первом рендере кэшированные данные тоже озвучиваются, потом идет еще раз загрузка новых данных и они тоже озвучиваются
        //Может удалить кеш при размонтировании
        if(!isLoading && !isValidating && data && data[i]){
            const { speechSynthesis } = window
            const text = new SpeechSynthesisUtterance(data[i].eng)
            text.voice = speechSynthesis.getVoices()[144]
            // text.pitch
            // text.volume
            speechSynthesis.speak(text)
        }
    }, [i, data])
    return(
        <div className="w-full sm:w-1/2 mx-auto grid grid-cols-6 p-4 rounded-lg border-2">
                <div className='col-span-6 flex justify-center border-b-2'>
                    <h3 className="text-center text-2xl font-extrabold  p-4">{ data && data[i]?.rus || <Spinner /> }</h3>
                </div>
                <div className='col-span-6 flex justify-center border-b-2'>
                    <TextInput value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                </div>
                <div className='col-span-6 flex justify-center border-b-2'>
                    <button>Следующее слово</button>
                </div>
        </div>
    )
}