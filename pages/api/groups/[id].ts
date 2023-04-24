import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        const data = await prisma.group.findUnique({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(data);
    }catch(e){
        return res.status(500).json(e.message);
    }
}