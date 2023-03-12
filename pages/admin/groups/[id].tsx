import { Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react'
import { createFetch, updateFetch } from 'lib/fetchesCRUD'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { Group, Word } from '@prisma/client'
import { useRouter } from 'next/router'

export default function Admin_group(){
    const router = useRouter()
    const { id } = router.query

    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const [word_ids, setWord_ids] = useState<number[]>([])

    const { data, error, isLoading } = useSWR<Group & { word_ids : {id: number}[] }>(id ? `/api/admin/groups/${id}` : null)
    const { data: words, error: errorGroups, isLoading: isLoadingGroups } = useSWR<Word[]>(`/api/admin/words`)
    const { trigger } = useSWRMutation(`/api/admin/groups/${id}`, updateFetch)

    function handler(){
        trigger({eng, rus, word_ids})
    }
    function handlerWord_ids(i){
        if(word_ids.includes(+i)){
            setWord_ids(state => state.filter(el => el != i))
        } else{
            setWord_ids(state => state.concat([+i]))
        }
    }
    useEffect(()=>{
        if(data){
            setEng(data.eng)
            setRus(data.rus)
            setWord_ids(data.word_ids.map(el => el.id))
        }
    },[data])
    // useEffect(()=>{
    //     console.log(word_ids)
    // }, [word_ids])
    return(
        <>
            <div className="grid grid-cols-12">
                <div className='col-span-5'>Eng</div>
                <div className='col-span-5'>Rus</div>
                <div className='col-span-2'></div>
            </div>
            <div className="grid grid-cols-12">
                <div className='col-span-5'>
                    <TextInput value={eng} onChange={( { target: {value} }) => setEng(value)}/>
                </div>
                <div className='col-span-5'>
                    <TextInput value={rus} onChange={( { target: {value} }) => setRus(value)}/>
                </div>
                <div className='col-span-2'>
                    <Button onClick={handler}>
                        Сохранить
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-12">
                {isLoading && <Spinner size='xl' />}
                {!isLoading && words && words.map((el, i) => {
                    return (
                        <div className='col-span-12' key={i}>
                            <Checkbox id={String(el.id)} checked={word_ids.includes(el.id)} value={el.id} onChange={({ target: {value} }) => handlerWord_ids(value)}/>
                            <Label htmlFor={String(el.id)}> {el.eng} - {el.rus}</Label>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
Admin_group.admin = true