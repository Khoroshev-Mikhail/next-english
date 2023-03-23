import { Button, Progress } from "flowbite-react";
import Link from "next/link";
import useSWR from 'swr'

export default function Group_card({ id, eng, rus, _count } : { id: number, eng: string, rus: string, _count: { words: number} }){
    const { data } = useSWR(id ? `/api/groups/${id}/progress` : null)
    return (
        <div className="block truncate col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-2 rounded-xl border-2 border-gray grid grid-cols-6 text-center shadow-md">
            <h3 className="col-span-6 text-2xl font-extrabold mx-4 py-4 border-b-2 truncate">
                <Link href={`/groups/${id}`}>
                    {eng}
                </Link>
            </h3>
            <div className="col-span-6 p-2 text-center truncate">
                <Progress progress={data?.english || 0} label="Перевод с Англ." labelPosition="outside"></Progress>
                <Progress progress={data?.russian || 0} label="Перевод с Рус." labelPosition="outside"></Progress>
                <Progress progress={data?.auding || 0} label="Аудирование" labelPosition="outside"></Progress>
                <Progress progress={data?.spelling || 0} label="Произношение" labelPosition="outside"></Progress>
            </div>
            <div className="col-span-6 pt-2 text-center flex justify-center">
                <span>Слов в карточке: {_count.words}</span>
            </div>
            <div className="col-span-6 py-2 text-center flex justify-center">
                <Link href={`/groups/${id}`}><Button>Учить!</Button></Link>
            </div>
        </div>
    )
}