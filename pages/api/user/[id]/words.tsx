import { METHODS } from 'http';
import { connect } from 'http2';
import { ACCESS_IS_DENIED, MethodLearn, NON_EXISTENT_METHOD, NOT_ALL_DATA_PROVIDED, UNAUTHPRIZED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const { id } = req.query
        const { user: { id: user_id } } = await getServerSession(req, res, authOptions)
        if( id !== user_id ){
            return res.status(403).send(ACCESS_IS_DENIED)
        }
        if(req.method === "GET"){
            const { english, russian, auding, spelling} = await prisma.user.findUnique({
                where: {
                    id: String(id)  
                },
                select: {
                    english: true,
                    russian: true,
                    auding: true,
                    spelling: true,
                }
            })
            const data = english.concat(russian, auding, spelling)
            const set = []
            const tmp = []
            data.forEach(el => {
                if(!tmp.includes(el.id)){
                    tmp.push(el.id)
                    set.push(el)
                }
            })
            const result = set.map(el => {
                if(english.filter(el))
            })
            return res.status(200).json(Array.from(set));
        }

    }catch(e){
        return res.status(500).send(e.message);
    }
}