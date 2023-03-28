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

        const words_promise = prisma.group.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                words: {
                    where: {
                        russian: {
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
        const badAnswers_promise = prisma.group.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                words: {
                    select: {
                        eng: true
                    }
                }
            }
        })
        const [ { words }, { words: badAnswers } ] = await Promise.all([words_promise, badAnswers_promise])
        const result = []
        const tmp = badAnswers.map(el => el.eng)
        const set = new Set()
        words.forEach( async (el) => {
            set.add(el.eng)
            while(set.size < (tmp.length < 4 ? tmp.length : 4)){
                set.add(tmp[Math.floor(Math.random() * tmp.length)])
            }
            const answers = Array.from(set).sort(() => Math.random() - 0.5)
            result.push({ ...el, answers })
            set.clear()
        })
        return res.status(200).json(result.sort(() => Math.random() - 0.5));

    }catch(e){
        return res.status(500).send(e.message);
    }
}