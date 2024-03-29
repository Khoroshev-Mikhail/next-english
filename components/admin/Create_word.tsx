import { Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react'
import { createFetch, deleteFetch } from 'lib/fetchesCRUD'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { Group, Word_Type } from '@prisma/client'
import { WORD_TYPES } from 'lib/errors'

export default function CreateWord(){
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const [type, setType] = useState<string>()
    const [groups, setGroup_ids] = useState<number[]>([])

    const {data, error, isLoading} = useSWR<Group[]>(`/api/admin/groups`)
    const { trigger } = useSWRMutation(`/api/admin/words`, createFetch)

    async function handler(){   
        console.log('ara')
        await trigger({eng, rus, groups, type})
        setEng('')
        setRus('')
        // setGroup_ids([])
    }
    function handlerGroup_ids(i: number){
        if(groups.includes(i)){
            setGroup_ids(state => state.filter(el => el !== i))
        } else{
            setGroup_ids(state => state.concat([Number(i)]))
        }
    }
    return(
        <div className='p-4 border-2 rounded-lg mb-4'>
            <h4 className='mb-2'>Создать новое слово</h4>
            <div className="grid grid-cols-12 gap-x-4">
                <div className='col-span-5'>
                    {/* <Label htmlFor='eng'>Eng</Label> */}
                    <TextInput id='eng' value={eng} onChange={( { target: {value} }) => setEng(value)} placeholder="English"/>
                </div>
                <div className='col-span-5'>
                    {/* <Label htmlFor='rus'>Rus</Label> */}
                    <TextInput id='rus' value={rus} onChange={( { target: {value} }) => setRus(value)} placeholder="Русский"/>
                </div>
                <div className='col-span-2 flex justify-end'>
                    {/* Добавь на enter */}
                    <Button onClick={handler}>
                        Создать
                    </Button>
                </div>
            </div>
            <div className='col-span-12 mt-4 mb-2'>
                <h4 className=''>Тип слова</h4>
            </div>
            <div className="col-span-12">
                <select value={type} defaultValue={WORD_TYPES[0]} onChange={(e)=>setType(e.target.value)} className='w-full border border-gray-200 rounded-lg'>
                    {WORD_TYPES.map((el, i) => {
                        return <option key={i}>{el}</option>
                    })}
                </select>
            </div>
            <div className='col-span-12 mt-4 mb-2'>
                <h4 className=''>Включить в группы:</h4>
            </div>
            <div className="grid grid-cols-12 border border-gray-200 rounded-lg py-4 gap-4">
                {isLoading && <Spinner size='xl' />}
                {!isLoading && data && data.map((el, i) => {
                    return (
                        <div className='col-span-3 pl-4' key={i}>
                            <Checkbox id={String(el.id)} value={el.id} checked={groups.includes(el.id)} onChange={({ target: {value} }) => handlerGroup_ids(Number(value))}/>
                            <Label htmlFor={String(el.id)}> {el.eng} / {el.rus}</Label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}