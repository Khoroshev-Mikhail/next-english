import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { MethodLearn, NON_EXISTENT_METHOD, NOT_ALL_DATA_PROVIDED, UNAUTHPRIZED } from 'lib/errors';
import { METHODS } from 'http';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id_group } = req.query
        const session = await getServerSession(req, res, authOptions)
        if(!session?.user.id){
            throw new Error(UNAUTHPRIZED)
        }

        if(req.method === 'GET'){
            // START @todo Сделай в одном запросе
            const { english } = await prisma.user.findUnique({
                where: {
                    id: String(session.user.id)
                },
                select: {
                    english: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            //переменуй в word_ids - word
            const { word_ids } = await prisma.group.findUnique({
                where: {
                    id: Number(id_group),
                },
                select: {
                    word_ids: {
                        select: {
                            id: true,
                            eng: true,
                            rus: true
                        }
                    }
                }
            })
            const filtred = word_ids.filter(el => !english.map(val => val.id).includes(el.id))
            // END @todo Сделай в одном запросе

            if(filtred.length === 0){
                return res.status(204).send(null);
            }
            const main = filtred[0]
            const answers = word_ids.filter(el => el.id !== main.id).sort(() => 0.5 - Math.random()).slice(-3).concat([{ id: main.id, eng: main.eng, rus: main.rus }]).sort(() => 0.5 - Math.random())
            return res.status(200).json({ ...main, answers });
        }

        const { method, word_id } : { method: MethodLearn, word_id: number } = JSON.parse(req.body)
        if(!method || !word_id){
            throw new Error(NOT_ALL_DATA_PROVIDED)
        }
        if(method !== 'ENGLISH'){
            throw new Error(NON_EXISTENT_METHOD)
        }

        if(req.method === "PUT"){  
            const data = await prisma.user.update({
                where: {
                    id: String(session.user.id)
                },
                data: {
                    english: {
                        connect: { id: +word_id }
                    },
                },
            })
            return res.status(200).json(data);
        }
        if(req.method === "DELETE"){
            const data = await prisma.user.update({
                where: {
                    id: String(session.user.id)
                },
                data: {
                    english: {
                        disconnect: { id: +word_id }
                    }
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}