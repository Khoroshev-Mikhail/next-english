import { ACCESS_IS_DENIED, NOT_ALL_DATA_PROVIDED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';
import { ucFirst } from 'lib/fns';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { user: { role } } = await getServerSession(req, res, authOptions)
        if(role !== 'ADMIN'){
            throw new Error(ACCESS_IS_DENIED)
        }
        if(req.method === "GET"){
            const data = await prisma.word.findMany({
                include: {
                    groups: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            return res.status(200).json(data);
        }
        if(req.method === "POST"){
            const { eng, rus, groups, type } = JSON.parse(req.body)
            if(!eng || !rus || !groups || !type){
                throw new Error(NOT_ALL_DATA_PROVIDED)
            }
            const data = await prisma.word.create({
                data: {
                    eng: ucFirst(eng),
                    rus: ucFirst(rus),
                    type,
                    groups: {
                        connect: groups.map((el: number) => ({id: +el}))
                    }
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}