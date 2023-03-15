//Ошибки
export const ACCESS_IS_DENIED = 'Доступ запрещен'
export const UNAUTHPRIZED = 'Не авторизован.'
export const NOT_ALL_DATA_PROVIDED = 'Указаны не все данные.'
export const NON_EXISTENT_METHOD = 'Не существующий метод.'
export const WITHOUT_ID = 'Не указан id.'


//Константы и типизация
export const METHODS: MethodLearn[] = ['ENGLISH', 'RUSSIAN', 'AUDING', 'SPELLING']
export type MethodLearn = 'ENGLISH' | 'RUSSIAN' | 'AUDING' | 'SPELLING'