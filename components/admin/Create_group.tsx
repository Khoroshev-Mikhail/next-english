import { Button, TextInput } from 'flowbite-react'
import { createFetch } from 'lib/fetchesCRUD'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

export default function CreateGroup(){
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const { trigger } = useSWRMutation(`/api/admin/groups`, createFetch)

    function handler(){
        trigger({eng, rus})
    }
    return(
        <div className='p-4 border-2 rounded-lg mb-4'>
        <div className='col-span-12 mt-4 mb-2'>
            <h4 className=''>Создать новую группу слов</h4>
        </div>
            <div className="grid grid-cols-12 gap-x-4">
                <div className='col-span-5'>
                    {/* <Label htmlFor='eng'>Eng</Label> */}
                    <TextInput id='eng' value={eng} onChange={( { target: {value} }) => setEng(value)} placeholder="English"/>
                </div>
                <div className='col-span-5'>
                    {/* <Label htmlFor='rus'>Rus</Label> */}
                    <TextInput id='rus' value={rus} onChange={( { target: {value} }) => setRus(value)} placeholder="Русский"/>
                </div>
                <div className='col-span-2'>
                    <Button onClick={handler}>
                        Создать
                    </Button>
                </div>
            </div>
        </div>
    )
}
CreateGroup.admin = true