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
            <h1 className='p-4'>Todo</h1>
            <ul className='list-disc list-outside'>
                <li>смахивание</li>
                <li>toLowerCase на бэке</li>
                <li>promise all везде</li>
                <li>страницы nextauth</li>
                <li>страница пользователя / словаря</li>
                <li>авторизация через яндекс</li>
                <li>авторизация через вк</li>
                <li>анимации
                    <ul className='list-decimal'>
                        <li>пагинации</li>
                        <li>прогессбаров(медленно растягивались) + спиннер или другая заглушка когда данные подргружаются</li>
                    </ul>
                </li>
                <li>вебпак</li>
                <li>продвинутый тайпскрипт</li>
            </ul>
            <h1 className='p-4'>Можно добавить</h1>
            <ul className='list-disc'>
            <li>Пагинация для методов изучения слов
                    <ul className='list-decimal'>
                        <li>Верстка</li>
                        <li>Кликабельность кнопок</li>
                    </ul>
                </li>
            </ul>
            <h1 className='p-4'>Errors</h1>
            <ul className='list-disc'>
                <li>На странице english и аналогичных: когда остается мало НЕизученных слов вариантов ответов тоже предлагается несколько</li>
            </ul>
        </div>
    )
}