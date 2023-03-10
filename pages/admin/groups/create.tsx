import { Button, TextInput } from 'flowbite-react'
import { createFetch } from 'lib/fetchesCRUD'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

export default function Main(){
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const { trigger } = useSWRMutation(`/api/admin/groups`, createFetch)

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