import { useRouter } from 'next/router'
import useSWR from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { Spinner, TextInput } from 'flowbite-react'
import { AUDING, DELAY, SPEAKING } from 'lib/errors'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Image from 'next/image'

const APP_ID = "5f4e33d5-c05f-4e56-928e-36257a6661b0"
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(APP_ID);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

export default function Speaking(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useSWR<{ id: number, eng: string, rus: string }[]>(id ? `/api/groups/${id}/speaking` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/speaking/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ answer, setAnswer ] = useState<string>('')
    const [ isMicrophoneOn, setIsMicrophoneOn ] = useState<boolean>(true)
    
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ language: 'en-US' , continuous: true });
      
    useEffect(()=>{
        if(data && data[i]){
            const eng = data[i].eng.toLocaleUpperCase()
            const attemptVoice = transcript.split(' ').at(-1).toLocaleUpperCase()
            const attemptKeyboard = answer.toLocaleUpperCase()
            if(eng === attemptVoice || eng === attemptKeyboard){
                trigger({ method: SPEAKING, word_id: data[i].id })
                resetTranscript()
                setTimeout(() => { 
                    setI(state => state + 1) 
                    resetTranscript()
                }, DELAY)
            }
        }
    }, [answer, data, i, transcript])

    useEffect(()=>{
        setI(0)
    }, [data])

    useEffect(()=>{
        startListening()
        return () => {
            SpeechRecognition.stopListening()
        }
    }, [])
    useEffect(()=>{
        if(isMicrophoneOn){
            startListening()
        }
        if(!isMicrophoneOn){
            SpeechRecognition.stopListening()
        }
    }, [isMicrophoneOn])
    useEffect(()=>{
        setTimeout(()=>{
            resetTranscript()
        }, 1500)
    }, [transcript])


    return (
        <div className="w-full min-h-[340px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4">
            {isLoading &&
                <div className='w-full h-full min-h-[270px] flex flex-col justify-center text-center'>
                    <Spinner />
                </div>
            }
            {!isLoading && data &&
            <>
                <div className='flex justify-end'>
                    {/* сделать анимацию красный микрофон с исходящими кругами */}
                    <Image src={isMicrophoneOn ? '/images/pause-circle.svg' : '/images/microphone.svg'} alt={isMicrophoneOn ? 'sound ON' : 'sound OFF'} onClick={()=>setIsMicrophoneOn(!isMicrophoneOn)} width={20} height={20} className="cursor-pointer"/>
                </div>
                <div className='flex justify-center'>
                    <h3 className="text-center text-2xl font-extrabold p-2">
                        { data && data[i].rus }
                    </h3>
                </div>
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
            </>
            }
        </div>
      );
}
Speaking.auth = true