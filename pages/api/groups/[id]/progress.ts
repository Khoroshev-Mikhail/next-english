import { UNAUTHPRIZED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const session = await getServerSession(req, res, authOptions)
        if(!session?.user.id){
            throw new Error(UNAUTHPRIZED)
        }
        const { id } = req.query
        if(req.method === "GET"){
            const english_promise = await prisma.group.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    _count: {
                        select: {
                            words: {
                                where: {
                                    english: {
                                        none: { id: String(session.user.id) }
                                    }
                                }
                            },
                        },
                    },
                },
            })
            const russian_promise = await prisma.group.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    _count: {
                        select: {
                            words: {
                                where: {
                                    russian: {
                                        none: { id: String(session.user.id) }
                                    }
                                }
                            },
                        },
                    },
                },
            })
            const speaking_promise = await prisma.group.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    _count: {
                        select: {
                            words: {
                                where: {
                                    speaking: {
                                        none: { id: String(session.user.id) }
                                    }
                                }
                            },
                        },
                    },
                },
            })
            const auding_promise = await prisma.group.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    _count: {
                        select: {
                            words: {
                                where: {
                                    auding: {
                                        none: { id: String(session.user.id) }
                                    }
                                }
                            },
                        },
                    },
                },
            })
            const total_promise = await prisma.group.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    _count: true,
                },
            })
            const result_promise = await Promise.all([english_promise, russian_promise, speaking_promise, auding_promise, total_promise])
            
            const { _count: { words: english } } = english_promise
            const { _count: { words: russian } } = russian_promise
            const { _count: { words: speaking } } = speaking_promise
            const { _count: { words: auding } } = auding_promise
            const { _count: { words: total } } = total_promise

            const result = {
                english: Math.round((total - english) * (100 / total)),
                russian: Math.round((total - russian) * (100 / total)),
                auding: Math.round((total - auding) * (100 / total)),
                speaking: Math.round((total - speaking) * (100 / total)),
                count_words: total
            }  
            return res.status(200).json(result); 
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}