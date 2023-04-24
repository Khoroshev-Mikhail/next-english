import { Group } from '@prisma/client'
import Group_card from 'components/groups/Group_card'
import { GetStaticProps } from 'next';
import useSWR from 'swr'
import prisma from '../../lib/prisma';

export const getServerSideProps: GetStaticProps = async ({ params }) => {
    const groups = await prisma.group.findMany({
        where: {
            visible: true
        },
        select: {
            id: true,
            eng: true,
            rus: true,
            _count: true,
        },
    })
    return {
      props: {
        fallbackData: groups
      },
    };
}

export default function Groups({ fallbackData }){
    const { data, error, isLoading } = useSWR<(Group & { _count: { words: number }})[]>(`/api/groups`, { fallbackData })
    return(
        <div className="grid grid-cols-12 gap-2 sm:gap-4 px-2">
            {!error && data && data?.map((el, i) =>{
                return <Group_card {...el} key={i}/>
            })}
        </div>
    )
}