import { Group } from '@prisma/client'
import useSWR from 'swr'

export default function Groups(){
    const {data, error, isLoading} = useSWR<Group[]>(`/api/groups`)
    return(
        <div className="">
            {data && data.map(el =>{
                return <p>{el.eng}</p>
            })}
        </div>
    )
}