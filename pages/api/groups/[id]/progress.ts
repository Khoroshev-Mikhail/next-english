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
            const { _count: { words: english } } = await prisma.group.findUnique({
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
            const { _count: { words: russian } } = await prisma.group.findUnique({
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
            const { _count: { words: speaking } } = await prisma.group.findUnique({
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
            const { _count: { words: auding } } = await prisma.group.findUnique({
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
            const {_count: { words : total } } = await prisma.group.findUnique({
                where: {
                    id: Number(id)
                },
                select: {
                    _count: true,
                },
            })
            const result = {
                english: (total - english) * (100 / total),
                russian: (total - russian) * (100 / total),
                auding: (total - auding) * (100 / total),
                speaking: (total - speaking) * (100 / total),
            }    
            return res.status(200).json(result); 
        }
        // Количество слов из этой группы выученной пользователем метолом english / на количество слов в группе
    }catch(e){
        return res.status(500).json(e.message);
    }
}