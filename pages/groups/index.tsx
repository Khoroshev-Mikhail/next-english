import { Group } from '@prisma/client'
import Group_card from 'components/groups/Group_card'
import useSWR from 'swr'

export default function Groups(){
    const {data, error, isLoading} = useSWR<Group[]>(`/api/groups`)
    return(
        <div className="grid grid-cols-12 gap-4">
            {data?.map((el, i) =>{
                return <Group_card {...el} />
            })}
        </div>
    )
}