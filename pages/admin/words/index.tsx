import { Word } from '@prisma/client'
import Link from 'next/link'
import useSWR from 'swr'

export default function Main(){
    const {data, error, isLoading} = useSWR<Word[]>(`/api/admin/words`)

    return(
        <>
            <div className="grid grid-cols-12">
                <div className='col-span-1'>Id</div>
                <div className='col-span-5'>Eng</div>
                <div className='col-span-5'>Rus</div>
                <div className='col-span-1'>
                    <Link href='/admin/words/create'>Добавить</Link>
                </div>
            </div>
            {data && data.map(el =>{
                return (
                    <div className="grid grid-cols-12">
                        <div className='col-span-1'>{el.id}</div>
                        <div className='col-span-5'>{el.eng}</div>
                        <div className='col-span-5'>{el.rus}</div>
                        <div className='col-span-1'><Link href={`/admin/words/${el.id}`}>Edit</Link></div>
                    </div>
                )
            })}
        </>
    )
}
Main.admin = true