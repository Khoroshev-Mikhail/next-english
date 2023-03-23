import { Checkbox, Label, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { Word } from '@prisma/client'
import { updateFetch } from 'lib/fetchesCRUD'

export default function Group_row(props : { id: number, eng: string, rus: string, words: {id: number}[] }){
    const [ isUpdating, setUpdating ] = useState<boolean>(false)
    const [ eng, setEng ] = useState<string>(props.eng)
    const [ rus, setRus ] = useState<string>(props.rus)
    const [ words, setWord_ids ] = useState<number[]>(props.words.map(el => el.id))
    const [ str, setStr ] = useState<string>('')

    const { data, isLoading } = useSWR<Word[]>(props.id ? `/api/admin/groups/${props.id}/words` : null)
    const { trigger } = useSWRMutation(props.id ? `/api/admin/groups/${props.id}` : null, updateFetch)
    const { mutate } = useSWR(`/api/admin/groups`)

    const { data: search, isLoading: isLoadingSearch } = useSWR(`/api/admin/words/search?str=${str}`)

    async function handler(){
        setUpdating(false)
        if(eng !== props.eng || rus !== props.rus || JSON.stringify(words) !== JSON.stringify(props.words)){
            await trigger({eng, rus, words})
            mutate()
        }
    }
    function handlerWord_ids(i){
        if(words.includes(+i)){
            setWord_ids(state => state.filter(el => el != i))
        } else{
            setWord_ids(state => state.concat([+i]))
        }
    }

    useEffect(()=>{
        setEng(props.eng)
        setRus(props.rus)
        setWord_ids(props.words.map(el => el.id))
    },[ props ])

    return(
        <>
        {!isUpdating &&
            <div className="col-span-12 grid grid-cols-12 border-b-2">
                <div className='col-span-1 py-4'>{props.id}</div>
                <div className='col-span-5 py-4'>{props.eng}</div>
                <div className='col-span-4 py-4'>{props.rus}</div>
                <div className='col-span-2 py-3'>
                    <button 
                        onClick={()=>setUpdating(true)}
                        className='w-32 h-10 bg-transparent hover:bg-sky-100 border-solid  duration-500 hover:duration-500 border-2 text-lg font-medium rounded-md outline-none ml-10'
                    >
                        Обновить
                    </button>
                </div>
            </div>
        }
        {isUpdating && 
            <div className="col-span-12 grid grid-cols-12 border-b-2 pb-2">
                <div className='col-span-1 py-4'>{props.id}</div>
                <div className='col-span-5 py-4 pr-2'>
                    <TextInput value={eng} onChange={(e)=>setEng(e.target.value)}/>
                </div>
                <div className='col-span-4 py-4 pr-2'>
                    <TextInput value={rus} onChange={(e)=>setRus(e.target.value)}/>
                </div>
                <div className='col-span-2 py-3'>
                    <button 
                        onClick={()=>handler()}
                        className='w-32 h-10 bg-transparent hover:bg-sky-100 border-solid duration-500 hover:duration-500 border-2 text-lg font-medium rounded-md outline-none ml-10'
                    >
                        Сохранить
                    </button>
                </div>
                <div className="col-span-12 grid grid-cols-12 border border-gray-200 rounded-lg p-4 gap-4">
                    <div className='col-span-12'>
                        <h3>Поиск слов</h3>
                    </div>
                    <div className='col-span-12'>
                        <TextInput value={str} onChange={(e)=>setStr(e.target.value)} placeholder='Search'/>
                    </div>
                    <div className='col-span-12'>
                        {isLoadingSearch && <Spinner size='xl' />}
                        {!isLoadingSearch && search && search.map((el, i) => {
                            return (
                                <div className='col-span-3 pl-4' key={i}>
                                    <Checkbox id={String(el.id) + props.id} value={el.id} checked={words.includes(el.id)} onChange={({ target: {value} }) => handlerWord_ids(value)}/>
                                    <Label htmlFor={String(el.id) + props.id}> {el.eng} / {el.rus}</Label>
                                </div>
                            )
                        })}
                    </div>
                    <div className='col-span-12'>
                        <h3>Слова которые содержатся в группе</h3>
                    </div>
                    {isLoading && <Spinner size='xl' />}
                    {!isLoading && data && data.map((el, i) => {
                        return (
                            <div className='col-span-3 pl-4' key={i}>
                                <Checkbox id={String(el.id) + props.id} value={el.id} checked={words.includes(el.id)} onChange={({ target: {value} }) => handlerWord_ids(value)}/>
                                <Label htmlFor={String(el.id) + props.id}> {el.eng} / {el.rus}</Label>
                            </div>
                        )
                    })}
                </div>
            </div>
        }
        </>

    )
}