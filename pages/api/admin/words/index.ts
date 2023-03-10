import { ACCESS_IS_DENIED, NOT_ALL_DATA_PROVIDED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { user: { role } } = await getServerSession(req, res, authOptions)
        if(role !== 'ADMIN'){
            throw new Error(ACCESS_IS_DENIED)
        }
        if(req.method === "GET"){
            const data = await prisma.word.findMany({
                // include: {
                //     group_ids: true
                // }
                // Подумай над этим. Это для редактирования групп слов
            })
            return res.status(200).json(data);
        }
        if(req.method === "POST"){
            const { eng, rus, group_ids } = JSON.parse(req.body)
            if(!eng || !rus){
                throw new Error(eng)
            }
            const data = await prisma.word.create({
                data: {
                    eng: eng,
                    rus: rus,
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}