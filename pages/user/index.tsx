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
    return(
        <div className="grid grid-cols-12 gap-4 bg-white/30 p-4 backdrop-blur-lg rounded-lg border-2">
            <div className='col-span-2'>Имя</div> <div className='col-span-10'>{data?.name}</div>
            <div className='col-span-2'>Email</div> <div className='col-span-10'>{data?.email}</div>
            <div>
                {data?.english.map((el, i) => {
                    return <div key={i}>{el.eng}</div>
                })}
            </div>
        </div>
    )
}