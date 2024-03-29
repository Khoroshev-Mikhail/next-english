import { NOT_ALL_DATA_PROVIDED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        const { user: { role } } = await getServerSession(req, res, authOptions)
        if(role !== 'ADMIN'){
            throw new Error('Доступ запрещен.')
        }

        if(req.method === "GET"){
            const data = await prisma.group.findUnique({
                where: {
                    id: Number(id)  
                },
                include: {
                    words: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            return res.status(200).json(data);
        }
        if(req.method === "PUT"){
            const { eng, rus, words } : { eng: string, rus: string, words: number[] } = JSON.parse(req.body)
            if(!eng || !rus || !words){
                throw new Error(NOT_ALL_DATA_PROVIDED)
            }
            const data = await prisma.group.update({
                where: {
                    id: Number(id)
                },
                data: {
                    eng: eng ? String(eng) : undefined,
                    rus: rus ? String(rus) : undefined,
                    words: {
                        connect: words.length !== 0 ? words.map(el => ({ id: +el })) : undefined,
                        set: words.length === 0 ? [] : undefined
                    }
                } 
            })
            return res.status(200).json(data);
        }
        if(req.method === "DELETE"){
            const data = await prisma.group.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).json(e.message);
    }
}