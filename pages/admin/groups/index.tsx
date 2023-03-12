import { Group } from '@prisma/client'
import CreateGroup from 'components/admin/Create_group'
import Link from 'next/link'
import useSWR from 'swr'

export default function Admin_groups(){
    const {data, error, isLoading} = useSWR<Group[]>(`/api/admin/groups`)

    return(
        <>
            <CreateGroup />
            <div className="grid grid-cols-12">
                <div className='col-span-1'>Id</div>
                <div className='col-span-5'>Eng</div>
                <div className='col-span-5'>Rus</div>
                <div className='col-span-1'><Link href='/admin/groups/create'>Добавить</Link></div>
            </div>
            {data && data.map(el =>{
                return (
                    <div className="grid grid-cols-12">
                        <div className='col-span-1'>{el.id}</div>
                        <div className='col-span-5'>{el.eng}</div>
                        <div className='col-span-5'>{el.rus}</div>
                        <div className='col-span-1'><Link href={`/admin/groups/${el.id}`}>Edit</Link></div>
                    </div>
                )
            })}
        </>
    )
}
Admin_groups.admin = true