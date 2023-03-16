import { Checkbox, Spinner } from "flowbite-react";
import { AUDING, ENGLISH, MethodLearn, RUSSIAN, SPELLING, Vocabulary_Word } from "lib/errors";
import { deleteFetch, updateFetch } from "lib/fetchesCRUD";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWRMutation from 'swr/mutation'

export default function Vocabulary_row(props: Vocabulary_Word ){
    const { data: session } = useSession()
    const [ english, setEnglish ] = useState<boolean>(props.english)
    const [ russian, setRussian] = useState<boolean>(props.russian)
    const [ spelling, setSpelling ] = useState<boolean>(props.spelling)
    const [ auding, setAuding ] = useState<boolean>(props.auding)
    // const [ loading, setLoading ] = useState<boolean>(false) Как вариант так сделать при добавления спиннера

    const { trigger: triggerSet } = useSWRMutation(session?.user?.id ? `/api/user/${session.user.id}/vocabulary` : null, updateFetch)
    const { trigger: triggerDel } = useSWRMutation(session?.user?.id ? `/api/user/${session.user.id}/vocabulary` : null, deleteFetch)

    useEffect(()=>{
        setEnglish(props.english)
        setRussian(props.russian)
        setSpelling(props.spelling)
        setAuding(props.auding)
    },[ props ])

    async function set(method: MethodLearn, word_id: number){
        // setLoading(true)
        if(method === ENGLISH) setEnglish(true)
        if(method === RUSSIAN) setRussian(true)
        if(method === SPELLING) setSpelling(true)
        if(method === AUDING) setAuding(true)
        await triggerSet({ method, word_id})
        // setLoading(false)
    }
    async function del(method: MethodLearn, word_id: number){
        // setLoading(true)
        if(method === ENGLISH) setEnglish(false)
        if(method === RUSSIAN) setRussian(false)
        if(method === SPELLING) setSpelling(false)
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
                <Checkbox value={props.id} onChange={(e)=> spelling ? del(SPELLING, +e.target.value) : set(SPELLING, props.id)}/>
            </div>
            <div className='col-span-1 text-center'>
                <Checkbox value={props.id} onChange={(e)=> auding ? del(AUDING, +e.target.value) : set(AUDING, props.id)}/>
            </div>
        </>
    )
}