import { Word } from '@prisma/client'
import useSWR from 'swr'

export default function Words(){
    const {data, error, isLoading} = useSWR<Word[]>(`/api/words`)
    return(
        <div className="">
            {data && data.map(el =>{
                return <p>{el.eng}</p>
            })}
        </div>
    )
}