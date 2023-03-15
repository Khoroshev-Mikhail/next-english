import { Checkbox } from "flowbite-react";
import { AUDING, ENGLISH, MethodLearn, RUSSIAN, SPELLING, Vocabulary_Word } from "lib/errors";
import { deleteFetch, updateFetch } from "lib/fetchesCRUD";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWRMutation from 'swr/mutation'

export default function Vocabulary_row(props: Vocabulary_Word){
    const { data: session } = useSession()
    const [ english, setEnglish ] = useState<boolean>(props.english)
    const [ russian, setRussian] = useState<boolean>(props.russian)
    const [ spelling, setSpelling ] = useState<boolean>(props.spelling)
    const [ auding, setAuding ] = useState<boolean>(props.auding)

    const { trigger: triggerSet } = useSWRMutation(session?.user?.id ? `/api/user/${session.user.id}/vocabulary` : null, updateFetch)
    const { trigger: triggerDel } = useSWRMutation(session?.user?.id ? `/api/user/${session.user.id}/vocabulary` : null, deleteFetch)

    useEffect(()=>{
        setEnglish(props.english)
        setRussian(props.russian)
        setSpelling(props.spelling)
        setAuding(props.auding)
    },[ props ])

    function set(method: MethodLearn, word_id: number){
        triggerSet({ method, word_id})
    }
    function del(method: MethodLearn, word_id: number){
        triggerDel({ method, word_id})
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
                <Checkbox checked={english} onChange={()=> english ? del(ENGLISH, props.id) : set(ENGLISH, props.id)}/>
            </div>
            <div className='col-span-1 text-center'>
                <Checkbox checked={russian} onChange={()=> russian ? del(RUSSIAN, props.id) : set(RUSSIAN, props.id)}/>     
            </div>
            <div className='col-span-1 text-center'>
                <Checkbox checked={spelling} onChange={()=> spelling ? del(SPELLING, props.id) : set(SPELLING, props.id)}/>
            </div>
            <div className='col-span-1 text-center'>
                <Checkbox checked={auding} onChange={()=> auding ? del(AUDING, props.id) : set(AUDING, props.id)}/>
            </div>
        </>
    )
}