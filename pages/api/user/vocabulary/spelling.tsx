import { METHODS } from 'http';
import { ACCESS_IS_DENIED, MethodLearn, NON_EXISTENT_METHOD, NOT_ALL_DATA_PROVIDED, UNAUTHPRIZED } from 'lib/errors';
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
            const data = await prisma.user.findUnique({
                where: {
                    id: String(session.user.id)  
                },
                select: {
                    spelling: true
                }
            })
            return res.status(200).json(data);
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
                    spelling: {
                        connect: { id: word_id }
                    }
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
                    spelling: {
                        disconnect: { id: word_id }
                    }
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}