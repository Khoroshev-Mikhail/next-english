import { ACCESS_IS_DENIED } from 'lib/errors';
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
            const data = await prisma.text.findMany({
                include: {
                    group: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            return res.status(200).json(data);
        }
        if(req.method === "POST"){
            const { eng, rus, text, group } = JSON.parse(req.body)
            if(!eng || !rus || !text){
                throw new Error(eng)
            }
            const data = await prisma.text.create({
                data: {
                    eng: eng,
                    rus: rus,
                    text: text,
                    group: group ? group : undefined,
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}