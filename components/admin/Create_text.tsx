import { Button, TextInput, Textarea } from 'flowbite-react'
import { createFetch } from 'lib/fetchesCRUD'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'

export default function CreateText(){
    const [eng, setEng] = useState<string>('')
    const [rus, setRus] = useState<string>('')
    const [text, setText] = useState<string>('')
    const { trigger } = useSWRMutation(`/api/admin/text`, createFetch)

    function handler(){
        trigger({ eng, rus, text })
    }
    return(
        <div className='p-4 border-2 rounded-lg mb-4'>
            <h4 className='mb-2'>Создать новый текст</h4>
            <div className="grid grid-cols-12 gap-2">
                <div className='col-span-6'>
                    {/* <Label htmlFor='eng'>Eng</Label> */}
                    <TextInput id='eng' value={eng} onChange={( { target: {value} }) => setEng(value)} placeholder="English"/>
                </div>
                <div className='col-span-6'>
                    {/* <Label htmlFor='rus'>Rus</Label> */}
                    <TextInput id='rus' value={rus} onChange={( { target: {value} }) => setRus(value)} placeholder="Русский"/>
                </div>
                <div className='col-span-12'>
                    {/* <Label htmlFor='rus'>Rus</Label> */}
                    <Textarea id='text' value={text} onChange={( { target: {value} }) => setText(value)} placeholder="Текст"/>
                </div>
                <div className='col-span-12 flex justify-end'>
                    <Button onClick={handler}>
                        Создать
                    </Button>
                </div>
            </div>
        </div>
    )
}
CreateText.admin = true