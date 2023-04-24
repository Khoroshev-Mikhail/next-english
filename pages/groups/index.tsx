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

export default function Groups(){
    const { data, error, isLoading } = useSWR<Group[]>(`/api/groups`)
    return(
        <div className="grid grid-cols-12 gap-2 sm:gap-4 px-2">
            {!error && data && data?.map((el, i) =>{
                return <Group_card {...el} key={i}/>
            })}
        </div>
    )
}