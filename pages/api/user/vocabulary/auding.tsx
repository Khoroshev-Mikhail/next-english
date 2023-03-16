import { ACCESS_IS_DENIED, NOT_ALL_DATA_PROVIDED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query

        if(req.method === "GET"){
            const data = await prisma.user.findUnique({
                where: {
                    id: String(id)  
                },
                select: {
                    auding: true,
                }
            })
            return res.status(200).json(data);
        }

        const session = await getServerSession(req, res, authOptions)
        if(id !== session.user.id){
            return res.status(403).send(ACCESS_IS_DENIED);
        }
        const { method, word_id } : { method: 'AUDING', word_id: number } = JSON.parse(req.body)
        if(method !== 'AUDING' || !word_id){
            throw new Error(NOT_ALL_DATA_PROVIDED)
        }
        
        if(req.method === "PUT"){  
            const data = await prisma.user.update({
                where: {
                    id: String(id)
                },
                data: {
                    auding: {
                        connect: { id: word_id }
                    },
                },
            })
            return res.status(200).json(data);
        }
        if(req.method === "DELETE"){
            const data = await prisma.user.update({
                where: {
                    id: String(id)
                },
                data: {
                    auding: {
                        disconnect:  { id: word_id }
                    },
                },
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}