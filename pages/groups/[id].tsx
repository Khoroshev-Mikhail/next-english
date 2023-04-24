import { Group } from '@prisma/client'
import Method_card from 'components/groups/Method_card'
import { Spinner } from 'flowbite-react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export const getServerSideProps: GetStaticProps = async ({ params }) => {
    const { eng } = await prisma.group.findUnique({
        where: {
            id: Number(params.id)
        },
        select: {
            eng: true,
        },
    })
    return {
      props: {
        fallbackData: eng
      },
    };
}

export default function Group_Page({ fallbackData }){
    const router = useRouter()
    const { id } = router.query
    const {data, error, isLoading} = useSWR<Group>(id ? `/api/groups/${id}` : null, { fallbackData })
    return(
        <div className="grid grid-cols-12 gap-4 p-4 rounded-lg">
            <div className='col-span-12'>
                <h1 className='text-4xl text-center pb-4 min-h-[56px]'>{data?.eng || <Spinner />}</h1> 
            </div>
            <Method_card method='english' header='Перевод с Английского' />
            <Method_card method='russian' header='Перевод с Русского' />
            <Method_card method='auding' header='Аудирование' />
            <Method_card method='speaking' header='Произношение' />
        </div>
    )
}