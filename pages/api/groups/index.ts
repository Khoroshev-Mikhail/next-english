import { UNAUTHPRIZED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        // const session = await getServerSession(req, res, authOptions)
        // if(!session?.user.id){
        //     throw new Error(UNAUTHPRIZED)
        // }
        const data = await prisma.group.findMany({
            where: {
                visible: true
            },
            select: {
                id: true,
                eng: true,
                rus: true,
                _count: true,
            },
        })
        return res.status(200).json(data);
    }catch(e){
        return res.status(500).json(e.message);
    }
}