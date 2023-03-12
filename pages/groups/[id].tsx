import { Group } from '@prisma/client'
import Method_card from 'components/words/Method_card'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function Group_Page(){
    const router = useRouter()
    const { id } = router.query

    const {data, error, isLoading} = useSWR<Group[]>(id ? `/api/groups/${id}` : null)
    useEffect(()=>{
        console.log(data)
    }, [data])
    return(
        <div className="">
            <Method_card method='engToRus' />
            <Method_card method='rusToEng' />
            <Method_card method='auding' />
            <Method_card method='spelling' />
        </div>
    )
}