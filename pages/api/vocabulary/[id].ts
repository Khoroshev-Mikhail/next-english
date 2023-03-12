import { METHODS } from 'http';
import { ACCESS_IS_DENIED, NON_EXISTENT_METHOD, NOT_ALL_DATA_PROVIDED, UNAUTHPRIZED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from './../../../lib/prisma';
import { authOptions } from './../auth/[...nextauth]';

export type Method = 'ENGLISH' | 'RUSSIAN' | 'AUDING' | 'SPELLING'

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        const { user: { id: user_id } } = await getServerSession(req, res, authOptions)

        if(req.method === "GET"){
            const data = await prisma.user.findUnique({
                where: {
                    id: String(id)  
                },
                select: {
                    english: true,
                    russian: true,
                    auding: true,
                    spelling: true
                }
            })
            return res.status(200).json(data);
        }
        if(req.method === "PUT"){  
            if(id !== user_id){
                return res.status(403).send(ACCESS_IS_DENIED);
            }
            
            const { method, word_id } : { method: Method, word_id: number } = JSON.parse(req.body)
            if(!method || !word_id){
                throw new Error(NOT_ALL_DATA_PROVIDED)
            }
            if(METHODS.includes(method)){
                throw new Error(NON_EXISTENT_METHOD)
            }
            const data = await prisma.user.update({
                where: {
                    id: String(id)
                },
                data: {

                } 
            })
            return res.status(200).json(data);
        }
        if(req.method === "DELETE"){
            const data = await prisma.word.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).json(e.message);
    }
}