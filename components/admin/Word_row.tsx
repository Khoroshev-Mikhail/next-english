import { Checkbox, Label, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { Group, Word } from '@prisma/client'
import { deleteFetch, updateFetch } from 'lib/fetchesCRUD'

export default function Word_row(props : { id: number, eng: string, rus: string, groups: {id: number}[] }){
    const [ isUpdating, setUpdating ] = useState<boolean>(false)
    const [ eng, setEng ] = useState<string>(props.eng)
    const [ rus, setRus ] = useState<string>(props.rus)
    const [ groups, setGroup_ids ] = useState<number[]>(props.groups.map(el => el.id))

    const { data,  isLoading: isLoadingGroups } = useSWR<Group[]>(`/api/admin/groups`)
    const { trigger } = useSWRMutation(`/api/admin/words/${props.id}`, updateFetch)
    const { trigger: deleteTrigger } = useSWRMutation(props.id ? `/api/admin/words/${props.id}` : null, deleteFetch)
    const { mutate } = useSWR(`/api/admin/words`)

    async function handler(){
        setUpdating(false)
        if(eng !== props.eng || rus !== props.rus || JSON.stringify(groups) !== JSON.stringify(props.groups)){
            await trigger({eng, rus, groups})
            mutate()
        }
    }
    function handlerGroup_ids(i){
        if(groups.includes(+i)){
            setGroup_ids(state => state.filter(el => el != i))
        } else{
            setGroup_ids(state => state.concat([+i]))
        }
    }
    async function del(){
        await deleteTrigger({})
        mutate()
    }

    useEffect(()=>{
        setEng(props.eng)
        setRus(props.rus)
        setGroup_ids(props.groups.map(el => el.id))
    },[props])

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
                    <button 
                        onClick={()=>del()}
                        className='w-32 h-10 bg-transparent hover:bg-sky-100 border-solid  duration-500 hover:duration-500 border-2 text-lg font-medium rounded-md outline-none ml-10'
                    >
                        Удалить
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
                <div className="col-span-12 grid grid-cols-12 border border-gray-200 rounded-lg py-4  gap-4">
                    {isLoadingGroups && <Spinner size='xl' />}
                    {!isLoadingGroups && data && data.map((el, i) => {
                        return (
                            <div className='col-span-3 pl-4' key={i}>
                                <Checkbox id={String(el.id) + props.id} value={el.id} checked={groups.includes(el.id)} onChange={({ target: {value} }) => handlerGroup_ids(value)}/>
                                <Label htmlFor={String(el.id) + props.id}> {el.eng} - {el.rus}</Label>
                            </div>
                        )
                    })}
                </div>
            </div>
        }
        </>

    )
}