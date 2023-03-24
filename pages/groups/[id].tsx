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
                {/* задай мин высоту чтобы не скакало */}
                <h1 className='text-4xl text-center pb-4'>{data?.eng}</h1> 
            </div>
            <Method_card method='english' header='Перевод с Англ' />
            <Method_card method='russian' header='Перевод с Рус.' />
            <Method_card method='auding' header='Аудирование' />
            <Method_card method='speaking' header='Произношение' />
        </div>
    )
}