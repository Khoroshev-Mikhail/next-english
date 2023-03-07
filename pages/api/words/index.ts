import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        if(req.method === "GET"){
            const {id} = req.query
            const data = await prisma.word.findMany({
                where: {
                    id: id ? Number(id) : undefined,
                },                
                include: {
                  group_ids: {   
                    select: {
                        id: true
                    }
                  }
                }
            })
            return res.status(200).json(data);
        }
        if(req.method === "POST"){
            const {user: {id : userId, role}} = await getServerSession(req, res, authOptions)
        }
    }catch(e){
        return res.status(500).json(e.message);
    }
}