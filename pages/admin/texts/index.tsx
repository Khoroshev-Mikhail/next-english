import { Group } from '@prisma/client'
import CreateGroup from 'components/admin/Create_group'
import CreateText from 'components/admin/Create_text'
import Group_row from 'components/admin/Group_row'
import { sortWordByEng, sortWordById, sortWordByRus } from 'lib/compartators'
import { useState } from 'react'
import useSWR from 'swr'

export default function Admin_groups(){
    const {data, error, isLoading} = useSWR(`/api/admin/texts`)
    const [comparator, setComparator] = useState<{fn: any, increase: boolean}>({fn: sortWordById, increase: true})
    const [filter, setFilter] = useState<string>('')

    const sorted = data
    ? comparator.increase 
        ? [...data].sort(comparator.fn).filter(el => el.eng?.toLowerCase().includes(filter.toLowerCase()) || el.rus?.toLowerCase().includes(filter.toLowerCase())) 
        : [...data].sort(comparator.fn).filter(el => el.eng?.toLowerCase().includes(filter.toLowerCase()) || el.rus?.toLowerCase().includes(filter.toLowerCase())).reverse()
    : []

    function toggleComparator(currentComparator: any){
        setComparator(({fn, increase}) => {
            return {
                fn: currentComparator,
                increase: fn === currentComparator ? !increase : true
            };
        })
    }
    return(
        <>
            <CreateText />
            <div className='grid grid-cols-12 border-2 p-4 rounded-lg'>
                <div className="col-span-12 grid grid-cols-12">
                    <div className='col-span-1 cursor-pointer' onClick={()=>toggleComparator(sortWordById)}>Id</div>
                    <div className='col-span-5  cursor-pointer' onClick={()=>toggleComparator(sortWordByEng)}>Eng</div>
                    <div className='col-span-5 cursor-pointer' onClick={()=>toggleComparator(sortWordByRus)}>Rus</div>
                    <div className='col-span-1'></div>
                </div>
                {sorted.map((el, i) =>{
                    return (
                        <Group_row {...el} key={i}/>
                    )
                })}
            </div>
        </>
    )
}
Admin_groups.admin = true