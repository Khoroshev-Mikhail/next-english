import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { MethodLearn, NON_EXISTENT_METHOD, NOT_ALL_DATA_PROVIDED, UNAUTHPRIZED } from 'lib/errors';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const session = await getServerSession(req, res, authOptions)
        if(!session?.user.id){
            throw new Error(UNAUTHPRIZED)
        }
        if(req.method === 'GET'){
            const { word_ids: data } = await prisma.group.findUnique({
                where: {
                    id: Number(session.user.id)
                },
                select: {
                    word_ids: {
                        where: {
                            english: {
                                none: { id: String(session.user.id) }
                            }
                        },
                        select: {
                            id: true,
                            rus: true,
                            eng: true
                        }
                    },
                }
            })
            return res.status(200).json(data);
        }

        const { method, word_id } : { method: MethodLearn, word_id: number } = JSON.parse(req.body)
        if(!word_id){
            throw new Error(NOT_ALL_DATA_PROVIDED)
        }
        if(method !== 'ENGLISH'){
            throw new Error(NON_EXISTENT_METHOD)
        }
        
        if(req.method === "PUT"){  
            const data = await prisma.user.update({
                where: {
                    id: String(session.user.id)
                },
                data: {
                    english: {
                        connect: { id: +word_id }
                    },
                },
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
                        disconnect: { id: +word_id }
                    }
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}