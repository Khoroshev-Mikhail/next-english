import { useRouter } from 'next/router'
import useSWR from 'swr'
import { updateFetch } from 'lib/fetchesCRUD'
import useSWRMutation from 'swr/mutation'
import { useEffect, useState } from 'react'
import { Button, Spinner, TextInput } from 'flowbite-react'
import { AUDING, BG_SUCCESS, DELAY, SPEAKING } from 'lib/errors'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Image from 'next/image'
import { speechText, ucFirst } from 'lib/fns'
import Head from 'next/head'

const APP_ID = "5f4e33d5-c05f-4e56-928e-36257a6661b0"
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(APP_ID);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

export default function Speaking(){
    const router = useRouter()
    const { id } = router.query
    // const [ audio ] = useState(new Audio('/audio/success.mp3'))
    
    const { data, error, isLoading } = useSWR<{ id: number, eng: string, rus: string }[]>(id ? `/api/groups/${id}/speaking` : null)
    const { trigger } = useSWRMutation(`/api/user/vocabulary/speaking/`, updateFetch)
    const [ i, setI ] = useState<number>(0)
    const [ answer, setAnswer ] = useState<string>('')
    const [ goodAnswers, setGoodAnswers ] = useState<number[]>([])
    const [ isMicrophoneOn, setIsMicrophoneOn ] = useState<boolean>(true)
    
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ language: 'en-US' , continuous: true });
      
    useEffect(()=>{
        if(data && data[i]){
            const eng = data[i].eng.toLocaleUpperCase()
            const attemptVoice = transcript.split(' ').at(-1).toLocaleUpperCase()
            const attemptKeyboard = answer.toLocaleUpperCase()
            if(eng === attemptVoice || eng === attemptKeyboard){
                // audio.pause()
                // audio.currentTime = 0
                // audio.play()
                setGoodAnswers(state => state.concat(data[i].id))
                trigger({ method: SPEAKING, word_id: data[i].id })
                setTimeout(() => { 
                    if(i < data.length - 1){
                        setI(state => state + 1)
                    }
                }, DELAY)
            }
        }
    }, [answer, data, i, transcript])
    useEffect(()=>{
        setI(0)
        // resetTranscript()
    }, [ data ])
    useEffect(()=>{
        // resetTranscript()
    }, [ i ])
    // useEffect(()=>{
    //     startListening()
    //     return () => {
    //         SpeechRecognition.stopListening()
    //         resetTranscript()
    //     }
    // }, [])
    useEffect(()=>{
        if(isMicrophoneOn){
            resetTranscript()
            startListening()
        }
        if(!isMicrophoneOn){
            SpeechRecognition.stopListening()
            resetTranscript()
        }
    }, [isMicrophoneOn])
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         resetTranscript()
    //     }, 3000) //перепиши на timestamp - это не правильно. Таймер запустился, а слово все еще меняется...
    // }, [transcript])


    return (
        <div className={`${data && goodAnswers.includes(data[i]?.id) && BG_SUCCESS} w-[96%] mx-auto min-h-[100px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto flex flex-col rounded-lg border-2 shadow-md p-4`}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <title>Произношение</title>
            </Head>
            
            {isLoading &&
                <div className='w-full h-full min-h-[126px] flex flex-col justify-center text-center'>
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
                    {/* сделать анимацию красный микрофон с исходящими кругами */}
                    <Image src={isMicrophoneOn ? '/images/pause-circle.svg' : '/images/microphone.svg'} alt={isMicrophoneOn ? 'sound ON' : 'sound OFF'} onClick={()=>setIsMicrophoneOn(!isMicrophoneOn)} width={20} height={20} className="cursor-pointer"/>
                </div>
                <div className='flex justify-center cursor-pointer' onClick={()=>speechText(data[i].eng)}>
                    <h3 className="text-center text-2xl font-extrabold p-2">
                        { ucFirst(data[i]?.rus) } <Image src={'/images/speaker-wave.svg'} alt='(sound)' width={20} height={20} className="inline"/>
                    </h3>
                </div>
                <div className='flex justify-between'>
                    <Button color='gray' onClick={()=>{ setI(i => i - 1)}} disabled={i <= 0}>
                        <Image src={'/images/arrow-left.svg'} alt='<' width={20} height={20}/>
                    </Button>
                    <Button color='gray' onClick={()=>{ setI(i => i + 1)}} disabled={i >= data.length - 1}>
                        <Image src={'/images/arrow-right.svg'} alt='<' width={20} height={20}/>
                    </Button>
                </div>
                <div className='flex justify-center'>
                    <h3 className="text-center text-2xl font-extrabold p-2 truncate text-left">
                        {transcript.split(' ').at(-1)}
                        {/* сделать div с обрезанием текста */}
                    </h3>
                </div>
            </>
            }
        </div>
      );
}
Speaking.auth = true