import Link from "next/link";

export default function Group_card({ id, eng, rus } : { id: number, eng: string, rus: string }){
    return (
        <Link href={`/groups/${id}`} className="block col-span-12 sm:col-span-6 md:col-span-4 lg-col-span-3 rounded-xl border-2 border-gray grid grid-cols-6 text-center hover:bg-sky-100 duration-500 hover:duration-500">
            <h3 className="col-span-6 text-2xl font-extrabold border-b-2 mx-4 py-4">{eng}</h3>
            <div className="p-4">50%</div>
        </Link>
    )
}