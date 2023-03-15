import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { str } = req.query
        const data = await prisma.word.findMany({
            where: {
                OR: [
                    {
                        eng: {
                            contains: str ? String(str) : undefined,
                            mode: 'insensitive',
                        }
                    },
                    {
                        rus: {
                            contains: str ? String(str) : undefined,
                            mode: 'insensitive',
                        }
                    }
                ]
            },
            skip: 0,
            take: 5
        })
        return res.status(200).json(data);
    }catch(e){
        return res.status(500).send(e.message);
    }
}