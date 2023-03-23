import { Checkbox } from "flowbite-react";
import { AUDING, ENGLISH, MethodLearn, RUSSIAN, SPEAKING, Vocabulary_Word } from "lib/errors";
import { deleteFetch, updateFetch } from "lib/fetchesCRUD";
import { useEffect, useState } from "react";
import useSWRMutation from 'swr/mutation'

export default function Vocabulary_row(props: Vocabulary_Word ){
    const [ english, setEnglish ] = useState<boolean>(props.english)
    const [ russian, setRussian] = useState<boolean>(props.russian)
    const [ speaking, setSpeaking ] = useState<boolean>(props.speaking)
    const [ auding, setAuding ] = useState<boolean>(props.auding)
    // const [ loading, setLoading ] = useState<boolean>(false) Как вариант так сделать при добавления спиннера

    const { trigger: triggerSet } = useSWRMutation(`/api/user/vocabulary`, updateFetch)
    const { trigger: triggerDel } = useSWRMutation(`/api/user/vocabulary`, deleteFetch)

    useEffect(()=>{
        setEnglish(props.english)
        setRussian(props.russian)
        setSpeaking(props.speaking)
        setAuding(props.auding)
    },[ props ])

    async function set(method: MethodLearn, word_id: number){
        // setLoading(true)
        if(method === ENGLISH) setEnglish(true)
        if(method === RUSSIAN) setRussian(true)
        if(method === SPEAKING) setSpeaking(true)
        if(method === AUDING) setAuding(true)
        await triggerSet({ method, word_id})
        // setLoading(false)
    }
    async function del(method: MethodLearn, word_id: number){
        // setLoading(true)
        if(method === ENGLISH) setEnglish(false)
        if(method === RUSSIAN) setRussian(false)
        if(method === SPEAKING) setSpeaking(false)
        if(method === AUDING) setAuding(false)
        await triggerDel({ method, word_id})
        // setLoading(false)
    }
    return(
        <>
            <div className='col-span-4 cursor-pointer'>
                {props.eng}
            </div>
            <div className='col-span-4 cursor-pointer'>
                {props.rus}
            </div>
            <div className='col-span-1 text-center'>
                <Checkbox value={props.id} checked={english} onChange={(e)=> english ? del(ENGLISH, +e.target.value) : set(ENGLISH, props.id)}/>
            </div>
            <div className='col-span-1 text-center'>
                <Checkbox value={props.id} checked={russian} onChange={(e)=> russian ? del(RUSSIAN, +e.target.value) : set(RUSSIAN, props.id)}/>     
            </div>
            <div className='col-span-1 text-center'>
                <Checkbox value={props.id} checked={speaking}  onChange={(e)=> speaking ? del(SPEAKING, +e.target.value) : set(SPEAKING, props.id)}/>
            </div>
            <div className='col-span-1 text-center'>
                <Checkbox value={props.id} checked={auding}  onChange={(e)=> auding ? del(AUDING, +e.target.value) : set(AUDING, props.id)}/>
            </div>
        </>
    )
}