import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const data = await prisma.text.findMany({
            where: {
                visible: true
            },
            select: {
                id: true,
                eng: true,
                rus: true,
                text: true,
                group_id: true,
            },
        })
        return res.status(200).json(data);
    }catch(e){
        return res.status(500).json(e.message);
    }
}