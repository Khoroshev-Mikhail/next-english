import Link from "next/link";
import { useRouter } from "next/router";

export default function Method_card({ method } : { method: string }){
    const router = useRouter()
    const { id } = router.query
    return (
        <Link href={`${id}/english`} className="block col-span-12 sm:col-span-3 lg-col-span-3 rounded-xl border-2 border-grey grid grid-cols-6 text-center hover:bg-sky-100 duration-500 hover:duration-500">
            <h3 className="col-span-6 text-2xl font-extrabold  border-b-2 mx-4 py-4">{ method }</h3>
            <div className="w-full p-4">50%</div>
        </Link>
    )
}