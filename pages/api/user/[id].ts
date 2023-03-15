import { ACCESS_IS_DENIED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        const { user: { id: user_id } } = await getServerSession(req, res, authOptions)
        if( id !== user_id ){
            return res.status(403).send(ACCESS_IS_DENIED)
        }
        if(req.method === "GET"){
            const data = await prisma.user.findUnique({
                where: {
                    id: String(id)  
                },
                select: {
                    name: true,
                    email: true,
                }
            })
            return res.status(200).json(data);
        }

    }catch(e){
        return res.status(500).send(e.message);
    }
}