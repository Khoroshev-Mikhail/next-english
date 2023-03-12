import { Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react'
import { createFetch } from 'lib/fetchesCRUD'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { Group } from '@prisma/client'

export default function CreateWord(){
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const [group_ids, setGroup_ids] = useState<number[]>([])

    const {data: groups, error, isLoading} = useSWR<Group[]>(`/api/admin/groups`)
    const { trigger } = useSWRMutation(`/api/admin/words`, createFetch)

    function handler(){
        trigger({eng, rus, group_ids})
    }
    function handlerGroup_ids(i){
        if(group_ids.includes(i)){
            setGroup_ids(state => state.filter(el => el !== i))
        } else{
            setGroup_ids(state => state.concat([+i]))
        }
    }
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
                        Создать
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-12">
                {isLoading && <Spinner size='xl' />}
                {!isLoading && groups && groups.map((el, i) => {
                    return (
                        <div className='col-span-12' key={i}>
                            <Checkbox id={String(el.id)} value={el.id} onChange={({ target: {value} }) => handlerGroup_ids(value)}/>
                            <Label htmlFor={String(el.id)}> {el.eng} - {el.rus}</Label>
                        </div>
                    )
                })}
            </div>
        </>
    )
}