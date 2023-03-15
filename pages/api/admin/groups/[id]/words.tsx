import { WITHOUT_ID } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        if(!id){
            throw new Error(WITHOUT_ID)
        }
        const { word_ids } = await prisma.group.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                word_ids: true
            }
        })
        return res.status(200).json(word_ids);
    }catch(e){
        return res.status(500).send(e.message);
    }
}