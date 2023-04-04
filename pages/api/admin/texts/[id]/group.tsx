import { WITHOUT_ID } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        if(!id){
            throw new Error(WITHOUT_ID)
        }
        const { group } = await prisma.text.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                group: true
            }
        })
        return res.status(200).json(group);
    }catch(e){
        return res.status(500).send(e.message);
    }
}