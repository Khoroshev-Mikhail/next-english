import { Word } from "@prisma/client"

export const sortWordById = (a: Word, b: Word) => Number(a.id) - Number(b.id)
export const sortWordByEng = (a: Word, b: Word) => a.eng.localeCompare(b.eng)
export const sortWordByRus = (a: Word, b: Word) => a.rus.localeCompare(b.rus)