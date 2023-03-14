export default function Button({ text, fn, w, h }:{ text: string, fn: any, w?: number, h?: number }){
    return (
        <button onClick={fn} 
            className={`${w ? `w-${h}` : 'w-32'} ${h ? `h-${h}` : 'h-12'} bg-transparent hover:bg-sky-100 border-solid  duration-500 hover:duration-500 border-2 text-lg font-medium rounded-md outline-none ml-10`}
        >
            {text}
        </button>
    )
}