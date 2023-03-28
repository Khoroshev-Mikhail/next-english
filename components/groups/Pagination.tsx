import Image from "next/image"
export default function Pagination({ arrayOfAnswers, i } : { arrayOfAnswers: boolean[], i: number}){
    const length = (arrayOfAnswers.length) > 4 ? 1 : (5 - arrayOfAnswers.length) 
    return (
        <div className="flex justify-around">
            {arrayOfAnswers.slice(-4).concat(new Array(length).fill(null)).map((bool, i) => {
                return (
                    <div key={i} className={`px-2 rounded-md border-2 ${5 - length === i && 'border-black'}`}>
                        <Image src={ !bool ? (bool === null ? '/images/question-mark-circle.svg' :  '/images/x-circle.svg') : '/images/check-circle.svg'} alt='(sound)' width={20} height={20} className="inline"/>
                    </div>
                )
            })}
        </div>
    )
}