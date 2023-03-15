import { METHODS } from 'http';
import { ACCESS_IS_DENIED, MethodLearn, NON_EXISTENT_METHOD, NOT_ALL_DATA_PROVIDED, UNAUTHPRIZED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        const { user: { id: user_id } } = await getServerSession(req, res, authOptions)

        if(req.method === "GET"){
            const data = await prisma.user.findUnique({
                where: {
                    id: String(id)  
                },
                select: {
                    english: {
                        select: {
                            id: true,
                            eng: true,
                            rus: true
                        }
                    },
                    russian: true,
                    auding: true,
                    spelling: true
                }
            })
            // english.forEach(word => {
            //     result.push({...word, english: true})
            // })
            // russian.forEach(word => {
            //     if(!result.some(el => el.id === word.id)){
            //         result.push({...word, russian: true})
            //     }
                
            // })
            // auding.forEach(word => {
            //     if(!result.some(el => el.id === word.id)){
            //         result.push({...word, russian: true})
            //     }
                
            // })
            // spelling.forEach(word => {
            //     if(!result.some(el => el.id === word.id)){
            //         result.push({...word, russian: true})
            //     }
                
            // })
            return res.status(200).json(data);
        }

        if(id !== user_id){
            return res.status(403).send(ACCESS_IS_DENIED);
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
                    id: String(id)
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
                    id: String(id)
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