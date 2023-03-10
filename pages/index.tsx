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
            <Button color="light" onClick={() => signIn()}>
                Войти
            </Button>
            <Button color="light" onClick={() => signOut()}>
                Выход
            </Button>
            <div>вошел как {session?.user?.email}</div>
            {/* {data && data.map(el =>{
                return <p>{el.eng}</p>
            })} */}
        </div>
    )
}