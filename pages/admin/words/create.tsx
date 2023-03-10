import { Button, TextInput } from 'flowbite-react'
import { createFetch } from 'lib/fetchesCRUD'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { Group } from '@prisma/client'

export default function Main(){
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')

    const {data: groups, error, isLoading} = useSWR<Group[]>(`/api/admin/groups`)
    const { trigger } = useSWRMutation(`/api/admin/words`, createFetch)

    function handler(){
        trigger({eng, rus})
    }
    return(
        <>
            <div className="grid grid-cols-12">
                <div className='col-span-5'>Eng</div>
                <div className='col-span-5'>Rus</div>
                <div className='col-span-2'></div>
            </div>
            <div className="grid grid-cols-12">
                {groups && groups.map(el => {
                    return (
                        <div className='col-span-12'>{`${el.id} ${el.eng}-${el.rus}; `}</div>
                    )
                })}
            </div>
            <div className="grid grid-cols-12">
                <div className='col-span-6'>
                    <TextInput value={eng} onChange={( { target: {value} }) => setEng(value)}/>
                </div>
                <div className='col-span-6'>
                    <TextInput value={rus} onChange={( { target: {value} }) => setRus(value)}/>
                </div>
                <div className='col-span-2'>
                    <Button onClick={handler}>
                        Создать
                    </Button>
                </div>
            </div>
        </>
    )
}
Main.admin = true