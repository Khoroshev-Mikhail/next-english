import { Group, User, Word } from '@prisma/client'
import { updateFetch } from 'lib/fetchesCRUD'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export default function UserPage(){
    const { data: session } = useSession()
    //Расширь type User правильно 
    const {data, error, isLoading} = useSWR<User & { english: Word[], russian: Word[], spelling: Word[], auding: Word[] } >(session?.user?.id ? `/api/user/${session.user.id}` : null)
    const { trigger } = useSWRMutation(session?.user?.id ? `/api/vocabulary/${session.user.id}` : null, updateFetch)
    useEffect(()=>{
        console.log(data)
    },[data])
    return(
        <div className="">
            {data &&
                <>
                    <div>{data.name}</div>
                    <div>{data.email}</div>
                    <div>
                        {data.english.map((el, i) => {
                            return <div key={i}>{el.eng}</div>
                        })}
                    </div>
                </>
                }
                <button onClick={()=>{
                    trigger({ method: 'ENGLISH', word_id: 6 })
                }}>id:5</button>
        </div>
    )
}