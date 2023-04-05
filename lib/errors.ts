//Ошибки
export const ACCESS_IS_DENIED = 'Доступ запрещен.'
export const UNAUTHPRIZED = 'Не авторизован.'
export const NOT_ALL_DATA_PROVIDED = 'Указаны не все данные.'
export const NON_EXISTENT_METHOD = 'Не существующий метод.'
export const WITHOUT_ID = 'Не указан id.'

//Константы
export const ENGLISH = 'ENGLISH'
export const RUSSIAN = 'RUSSIAN'
export const SPELLING = 'SPELLING'
export const AUDING = 'AUDING'
export const SPEAKING = 'SPEAKING'
export const METHODS: MethodLearn[] = [ENGLISH, RUSSIAN, SPELLING, AUDING, SPEAKING]
export const DELAY = 600
export const BG_SUCCESS = 'bg-green-300'


//Типы
export type MethodLearn = 'ENGLISH' | 'RUSSIAN' | 'AUDING' | 'SPELLING' | 'SPEAKING'
export type Vocabulary = {
    english: number[]
    russian: number[]
    auding: number[]
    spelling: number[]
}
export type Vocabulary_Word = { 
    id: number 
    eng: string
    rus: string 
    english: boolean
    russian: boolean
    spelling: boolean
    auding: boolean
    speaking: boolean
}