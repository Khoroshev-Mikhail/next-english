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
            const data = await prisma.word.findUnique({
                where: {
                    id: Number(id)  
                }
            })
            return res.status(200).json(data);
        }
        if(req.method === "PUT"){
            const { eng, rus, group_ids } = JSON.parse(req.body)
            const data = await prisma.word.update({
                where: {
                    id: Number(id)
                },
                data: {
                    eng: eng ? String(eng) : undefined,
                    rus: rus ? String(rus) : undefined,
                } 
            })
            return res.status(200).json(data);
        }
        if(req.method === "DELETE"){
            const data = await prisma.word.delete({
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