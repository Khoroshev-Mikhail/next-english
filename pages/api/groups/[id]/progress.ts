import { UNAUTHPRIZED } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    //Переписать так: Получай массив всех слов юзера, получай все слова группы и на клиенте уже сравнивай (все кэшируется swr хуком)
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
                                        some: { id: String(session.user.id) }
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
                                        some: { id: String(session.user.id) }
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
                                        some: { id: String(session.user.id) }
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
                                        some: { id: String(session.user.id) }
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
            
            const { _count: { words: english } } = english_promise
            const { _count: { words: russian } } = russian_promise
            const { _count: { words: speaking } } = speaking_promise
            const { _count: { words: auding } } = auding_promise
            const { _count: { words: total } } = total_promise
            // const result_promise = await Promise.all([english_promise, russian_promise, speaking_promise, auding_promise, total_promise])
            // const { _count: { words: english } } = result_promise[0]
            // const { _count: { words: russian } } = result_promise[1]
            // const { _count: { words: speaking } } = result_promise[2]
            // const { _count: { words: auding } } = result_promise[3]
            // const { _count: { words: total } } = result_promise[4]

            const result = {
                english: Math.round(english  / total * 100),
                russian: Math.round(russian / total * 100),
                auding: Math.round(auding / total * 100),
                speaking: Math.round(speaking / total * 100),
                count_words: total
            }  
            return res.status(200).json(result); 
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}