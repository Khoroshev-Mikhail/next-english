import { useRouter } from 'next/router'
import useSWR from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { DELAY, RUSSIAN } from 'lib/errors'
import { speechText } from 'lib/fns'
import { Spinner } from 'flowbite-react'
import Image from 'next/image'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const APP_ID = "5f4e33d5-c05f-4e56-928e-36257a6661b0"
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(APP_ID);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

type Data = { id: number, eng: string, rus: string, answers: string[] }

export default function Russian(){
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading, isValidating } = useSWR<Data[]>(id ? `/api/groups/${id}/russian` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/russian/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ isGoodAnswer, setAnswer ] = useState<boolean>(null)
    const [ isMicrophoneOn, setIsMicrophoneOn ] = useState<boolean>(false)
    
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ language: 'en-US' , continuous: true });


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
    useEffect(()=>{
        setI(0)
    }, [ data ])
    useEffect(()=>{
        if(isMicrophoneOn){
            startListening()
        }
        if(!isMicrophoneOn){
            SpeechRecognition.stopListening()
        }
    }, [isMicrophoneOn])
    useEffect(()=>{
        return () => {
            SpeechRecognition.stopListening()
        }
    }, [])
    return(
        <div className="w-full min-h-[340px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4">
            {isLoading &&
                <div className='w-full h-full min-h-[270px] flex flex-col justify-center text-center'>
                    <Spinner />
                </div>
            }
            {!isLoading && data &&
            <>
                <div className='flex justify-end'>
                    {transcript.split(' ').at(-1)}
                    {/* сделать анимацию красный микрофон с исходящими кругами */}
                    <Image src={isMicrophoneOn ? '/images/pause-circle.svg' : '/images/microphone.svg'} alt={isMicrophoneOn ? 'sound ON' : 'sound OFF'} onClick={()=>setIsMicrophoneOn(!isMicrophoneOn)} width={20} height={20} className="cursor-pointer"/>
                </div>
                <div className='flex justify-center'>
                    <h3 className="text-center text-2xl font-extrabold p-2">
                        { data && data[i].rus }
                    </h3>
                </div>
                { data && data[i].answers.map((eng, i) => {
                    return (
                        <button
                            key={i}
                            onClick={ (e)=> answer(data[i].id, eng)}
                            className={`${isGoodAnswer === false && 'bg-red-500'} ${isGoodAnswer === true && 'bg-sky-500'} block shadow-md h-12 my-2 border-solid duration-500 border-2 text-lg font-medium rounded-md outline-none`}
                        >
                            {eng}
                        </button>
                    )
                })}
            </>
            }
        </div>
    )
}