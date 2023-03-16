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

        const { word_ids } = await prisma.group.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                word_ids: {
                    where: {
                        english: {
                            none: { id: String(session.user.id) }
                        }
                    },
                    select: {
                        id: true,
                        rus: true,
                        eng: true
                    }
                },
            }
        })
        const { word_ids: badAnswers } = await prisma.group.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                word_ids: {
                    select: {
                        rus: true
                    }
                }
            }
        })
        const result = []
        const tmp = badAnswers.map(el => el.rus)
        const set = new Set()
        word_ids.forEach(el => {
            while(set.size < 3){
                set.add(tmp[Math.floor(Math.random() * tmp.length)])
            }
            set.add(el.rus)
            const answers = Array.from(set).sort(() => Math.random() - 0.5)
            result.push({ ...el, answers })
            set.clear()
        })
        return res.status(200).json(result);

    }catch(e){
        return res.status(500).send(e.message);
    }
}