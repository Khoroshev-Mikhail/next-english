import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { UNAUTHPRIZED } from 'lib/errors';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        const session = await getServerSession(req, res, authOptions)
        if(!session?.user.id){
            throw new Error(UNAUTHPRIZED)
        }
        const { word_ids: data } = await prisma.group.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                word_ids: {
                    where: {
                        auding: {
                            none: { id: String(session.user.id) }
                        }
                    },
                    select: {
                        id: true,
                        eng: true
                    }
                },
            }
        })
        return res.status(200).json(data.sort(() => Math.random() - 0.5));

    }catch(e){
        return res.status(500).send(e.message);
    }
}