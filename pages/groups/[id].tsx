import { Group } from '@prisma/client'
import Method_card from 'components/groups/Method_card'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function Group_Page(){
    const router = useRouter()
    const { id } = router.query

    const {data, error, isLoading} = useSWR<Group>(id ? `/api/groups/${id}` : null)
    return(
        <div className="grid grid-cols-12 gap-4 p-4 rounded-lg">
            <div className='col-span-12'>
                <h1 className='text-4xl text-center pb-4'>{data?.eng}</h1>
            </div>
            <Method_card method='english' />
            <Method_card method='russian' />
            <Method_card method='auding' />
            <Method_card method='spelling' />
        </div>
    )
}