import { Group } from '@prisma/client'
import Method_card from 'components/groups/Method_card'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function Spelling(){
    const router = useRouter()
    const { id } = router.query


    return(
        <div className="grid grid-cols-6 gap-4 p-4 rounded-lg">
            <h3 className="col-span-6 text-2xl font-extrabold  border-b-2 mx-4 py-4"></h3>
        </div>
    )
}