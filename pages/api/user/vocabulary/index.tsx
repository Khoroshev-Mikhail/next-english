import { METHODS } from 'http';
import { ACCESS_IS_DENIED, MethodLearn, NON_EXISTENT_METHOD, NOT_ALL_DATA_PROVIDED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const session = await getServerSession(req, res, authOptions)
        if(!session.user.id){
            return res.status(403).send(ACCESS_IS_DENIED);
        }
        
        if(req.method === "GET"){
            const { english, russian, auding, spelling } = await prisma.user.findUnique({
                where: {
                    id: String(session.user.id)  
                },
                select: {
                    english: {
                        select: {
                            id: true,
                            eng: true,
                            rus: true
                        }
                    },
                    russian: {
                        select: {
                            id: true,
                            eng: true,
                            rus: true
                        }
                    },
                    auding: {
                        select: {
                            id: true,
                            eng: true,
                            rus: true
                        }
                    },
                    spelling: {
                        select: {
                            id: true,
                            eng: true,
                            rus: true
                        }
                    },
                }
            })
            //Рефакторинг
            const result = []
            english.forEach(word => { //(О)n
                result.push({...word, english: true, russian: false, spelling: false, auding: false})
            })
            russian.forEach(word => { //(О)1/2n^2
                const i = result.findIndex(el => el.id === word.id)
                if(i > -1){
                    result[i] = {...result[i], russian: true}
                }else{
                    result.push({...word, english: false, russian: true, spelling: false, auding: false })
                }
            })
            auding.forEach(word => { //(О)1/2n^2
                const i = result.findIndex(el => el.id === word.id)
                if(i > -1){
                    result[i] = {...result[i], auding: true}
                }else{
                    result.push({...word,  english: false, russian: false, spelling: false, auding: true })
                }
            })
            spelling.forEach(word => { //(О)1/2n^2
                const i = result.findIndex(el => el.id === word.id)
                if(i > -1){
                    result[i] = {...result[i], spelling: true}
                }else{
                    result.push({...word,  english: false, russian: false, spelling: true, auding: false })
                }
            })
            // (О)1/2n^2*3 + //(О)n = (О)3/2n^2 + (O)n
            //Загрузка при таком подходе минимальная 400-450мс
            //Средняя в диапазоне 400-1000мс
            //Бывают и до 1500мс 
            //Но при возврате просто data = { english, russian, auding, spelling } - минимальная загрузка около 380мс но средняя примерно такаяже, но после деплоя это может поменяться
            return res.status(200).json(result);
        }

        const { method, word_id } : { method: MethodLearn, word_id: number } = JSON.parse(req.body)
        if(!method || !word_id){
            throw new Error(NOT_ALL_DATA_PROVIDED)
        }
        if(METHODS.includes(method)){
            throw new Error(NON_EXISTENT_METHOD)
        }
        
        if(req.method === "PUT"){  
            const data = await prisma.user.update({
                where: {
                    id: String(session.user.id)
                },
                data: {
                    english: {
                        connect: method === 'ENGLISH' ? { id: +word_id } : undefined
                    },
                    russian: {
                        connect: method === 'RUSSIAN' ? { id: word_id } : undefined
                    },
                    spelling: {
                        connect: method === 'SPELLING' ? { id: word_id } : undefined
                    },
                    auding: {
                        connect: method === 'AUDING' ? { id: word_id } : undefined
                    },
                },
                select: {
                    english: method === 'ENGLISH' ? true : undefined,
                    russian: method === 'RUSSIAN' ? true : undefined,
                    spelling: method === 'SPELLING' ? true : undefined,
                    auding: method === 'AUDING' ? true : undefined,
                }
            })
            return res.status(200).json(data);
        }
        if(req.method === "DELETE"){
            const data = await prisma.user.update({
                where: {
                    id: String(session.user.id)
                },
                data: {
                    english: {
                        disconnect: method === 'ENGLISH' ? { id: +word_id } : undefined
                    },
                    russian: {
                        disconnect: method === 'RUSSIAN' ? { id: word_id } : undefined
                    },
                    spelling: {
                        disconnect: method === 'SPELLING' ? { id: word_id } : undefined
                    },
                    auding: {
                        disconnect: method === 'AUDING' ? { id: word_id } : undefined
                    },
                },
                select: {
                    english: method === 'ENGLISH' ? true : undefined,
                    russian: method === 'RUSSIAN' ? true : undefined,
                    spelling: method === 'SPELLING' ? true : undefined,
                    auding: method === 'AUDING' ? true : undefined,
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}