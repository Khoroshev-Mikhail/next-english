import { Word } from '@prisma/client'
import { Button } from 'flowbite-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function Main(){
    const {data, error, isLoading} = useSWR<Word[]>(`/api/words`)
    const {data: session} = useSession()
    useEffect(()=>{
        console.log(session)
    },[session])
    return(
        <div className="">
            <h1>todo</h1>
            <ul>
                <li>Пагинация для методов изучения слов</li>
                <li>страница пользователя / словаря</li>
                <li>авторизация через яндекс</li>
                <li>авторизация через вк</li>
                <li>вебпак</li>
                <li>продвинутый тайпскрипт</li>
            </ul>
        </div>
    )
}