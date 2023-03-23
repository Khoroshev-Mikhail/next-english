import { useRouter } from 'next/router'
import useSWR from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { Spinner, TextInput } from 'flowbite-react'
import { AUDING, SPEAKING } from 'lib/errors'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const APP_ID = "5f4e33d5-c05f-4e56-928e-36257a6661b0"

export default function Speaking(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading, mutate } = useSWR<{ id: number, eng: string, rus: string }[]>(id ? `/api/groups/${id}/speaking` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/speaking/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ answer, setAnswer ] = useState<string>('')
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ language: 'en-US' , continuous: true });
      
    useEffect(()=>{
        if(data && data[i]){
            const eng = data[i].eng.toLocaleUpperCase()
            const attemptVoice = transcript.split(' ').at(-1).toLocaleUpperCase()
            const attemptKeyboard = answer.toLocaleUpperCase()
            if(eng === attemptVoice || eng === attemptKeyboard){
                trigger({ method: SPEAKING, word_id: data[i].id })
                setTimeout(() => { 
                    setI(state => state + 1) 
                    resetTranscript()
                }, 1000)
            }
        }
    }, [answer, data, i, transcript])

    useEffect(()=>{
        setI(0)
    }, [data])

    useEffect(()=>{
        mutate()
        startListening()
        return () => {
            SpeechRecognition.stopListening()
        }
    }, [])

    // if (!browserSupportsSpeechRecognition) {
    //     return(
    //         <div className="w-full sm:w-1/2 mx-auto grid grid-cols-6 p-4 rounded-lg border-2">
    //             <div className='col-span-6 flex justify-center border-b-2'>
    //                 <h3 className="text-center text-2xl font-extrabold  p-4">{ (data && data[i]?.rus) || <Spinner /> }</h3>
    //             </div>
    //             <div className='col-span-6 flex justify-center border-b-2'>
    //                 <TextInput value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
    //             </div>
    //             <div className='col-span-6 flex justify-center border-b-2'>
    //                 <button>Следующее слово</button>
    //             </div>
    //         </div>
    //     )
    // }
    return (
        <div className="w-full sm:w-1/2 mx-auto grid grid-cols-6 p-4 rounded-lg border-2">
            <div className='col-span-6 flex justify-center border-b-2'>
                <h3 className="text-center text-2xl font-extrabold  p-4">{ (data && data[i]?.rus) || <Spinner /> }</h3>          </div>
            <div className='col-span-6'>
                Microphone: {listening ? 'on' : 'off'}
            </div>
            <div className='col-span-6'>
                {data && data.length > 0 && i > 0 &&
                    <button onClick={()=>setI(i => i - 1)}>prev</button>
                }
                {data && data.length > 0 && i < data.length - 2 &&
                    <button onClick={()=>setI(i => i + 1)}>next</button>
                }
            </div>
            <div className='col-span-6'>
                {transcript.split(' ').at(-1)}
            </div>
        </div>
      );
}