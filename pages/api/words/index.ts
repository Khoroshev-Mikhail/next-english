import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        if(req.method === "GET"){
            const data = await prisma.word.findMany()
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).json(e.message);
    }
}