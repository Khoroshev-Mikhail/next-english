import { Group } from '@prisma/client'
import Link from 'next/link'
import useSWR from 'swr'

export default function Groups(){
    const {data, error, isLoading} = useSWR<Group[]>(`/api/groups`)
    return(
        <div className="">
            {data && data.map((el, i) =>{
                return <p key={i}><Link href={`/groups/${el.id}`}>{el.eng}</Link></p>
            })}
        </div>
    )
}