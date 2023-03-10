import { Group } from '@prisma/client'
import Link from 'next/link'
import useSWR from 'swr'

export default function Main(){
    const {data, error, isLoading} = useSWR<Group[]>(`/api/admin/groups`)

    return(
        <>
            <div className="grid grid-cols-12">
                <div className='col-span-1'>Id</div>
                <div className='col-span-5'>Eng</div>
                <div className='col-span-5'>Rus</div>
                <div className='col-span-1'>
                    <Link href='/admin/groups/create'>Добавить</Link>
                </div>
            </div>
            {data && data.map(el =>{
                return (
                    <div className="grid grid-cols-12">
                        <div className='col-span-1'>{el.id}</div>
                        <div className='col-span-5'>{el.eng}</div>
                        <div className='col-span-5'>{el.rus}</div>
                        <div className='col-span-1'><Link href={`/admin/groups/edit/${el.id}`}>Edit</Link></div>
                    </div>
                )
            })}
        </>
    )
}
Main.admin = true