import { Prisma, Word } from '@prisma/client'
import Group_card from 'components/groups/Group_card'
import { GetStaticProps } from 'next';
import useSWR from 'swr'
import prisma from '../../lib/prisma';
export type Group = {
    id: number;
    eng: string;
    rus: string;
    words: Word[];
    _count: Prisma.GroupCountOutputType;
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(`https://next-english.vercel.app/api/groups`)
    const groups = await res.json()
    // const groups = await prisma.group.findMany({
    //     where: {
    //         visible: true
    //     },
    //     select: {
    //         id: true,
    //         eng: true,
    //         rus: true,
    //         words: {
    //             select: {
    //                 id: true
    //             }
    //         },
    //         _count: true,
    //     },
    // })
    return {
      props: {
        fallbackData: groups
      },
      revalidate: 10
    };
}
export default function Groups({ fallbackData }){
    const { data, error, isLoading } = useSWR<Group[]>(`/api/groups`, { fallbackData })
    return(
        <div className="grid grid-cols-12 gap-2 sm:gap-4 px-2">
            {!error && data && data?.map((el, i) =>{
                return <Group_card {...el} key={i}/>
            })}
        </div>
    )
}