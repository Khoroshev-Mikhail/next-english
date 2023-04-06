import Vocabulary_row from 'components/client/Vocabulary_row'
import { Checkbox } from 'flowbite-react'
import { sortWordByEng, sortWordById, sortWordByRus } from 'lib/compartators'
import { Vocabulary_Word, } from 'lib/errors'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useSWR from 'swr'


export default function UserPage(){
    // const { data: session } = useSession()
    //Расширь type User правильно 
    // const { data, error, isLoading } = useSWR<{ name: string, email: string }>(session?.user?.id ? `/api/user/${session.user.id}` : null)
    const { data: vocabulary} = useSWR<Vocabulary_Word[]>(`/api/user/vocabulary`)
    const [ comparator, setComparator ] = useState<{fn: any, increase: boolean}>({fn: sortWordById, increase: true})

    const sorted = vocabulary
        ? comparator.increase 
            ? vocabulary.sort(comparator.fn)
            : vocabulary.sort(comparator.fn).reverse()
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
        <div className="grid grid-cols-12 gap-4 bg-white/30">
            <div className="col-span-12 grid grid-cols-12 border-b-2 pb-4 ">
                <div className='col-span-4 cursor-pointer text-center md:text-left' onClick={()=>toggleComparator(sortWordByEng)}>English</div>
                <div className='col-span-4 cursor-pointer text-center md:text-left' onClick={()=>toggleComparator(sortWordByRus)}>Russian</div>
                <div className='col-span-4 text-center md:text-left'></div>
                
                <div className='col-span-4 text-center md:text-left'>Eng</div>
                <div className='col-span-4 text-center md:text-left'>Rus</div>
                <div className='col-span-4  text-center md:text-left'>
                    <input type='checkbox' className='w-6 h-6 bg-gray-100 rounded-lg border-black'/>
                </div>
                {/* {sorted.map((el, i) => {
                    return <Vocabulary_row {...el} key={i} />
                })} */}
            </div>
        </div>
    )
}