import { Group } from '@prisma/client'
import Method_card from 'components/groups/Method_card'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function Russian(){
    const router = useRouter()
    const { id } = router.query


    return(
        <div className="grid grid-cols-12 gap-4 p-4 rounded-lg">
            hi
        </div>
    )
}