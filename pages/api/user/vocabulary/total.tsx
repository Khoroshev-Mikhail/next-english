import { METHODS } from 'http';
import { ACCESS_IS_DENIED, MethodLearn, NON_EXISTENT_METHOD, NOT_ALL_DATA_PROVIDED, SPEAKING, SPELLING } from 'lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]';

// export type UserListRelationFilter = {
//     every?: UserWhereInput
//     some?: UserWhereInput
//     none?: UserWhereInput
//   }
// export type WordWhereInput = {
//     AND?: Enumerable<WordWhereInput>
//     OR?: Enumerable<WordWhereInput>
//     NOT?: Enumerable<WordWhereInput>
//     id?: IntFilter | number
//     eng?: StringFilter | string
//     rus?: StringFilter | string
//     type?: EnumWord_TypeNullableFilter | Word_Type | null
//     visible?: BoolFilter | boolean
//     english?: UserListRelationFilter
//     russian?: UserListRelationFilter
//     spelling?: UserListRelationFilter
//     auding?: UserListRelationFilter
//     speaking?: UserListRelationFilter
//     groups?: GroupListRelationFilter
//   }
// export type WordListRelationFilter = {
//     every?: WordWhereInput
//     some?: WordWhereInput
//     none?: WordWhereInput
//   }

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try{
        const session = await getServerSession(req, res, authOptions)
        if(!session.user.id){
            return res.status(403).send(ACCESS_IS_DENIED);
        }
        if(req.method === "GET"){
            const data = await prisma.word.findMany({
                where: {
                    AND: [
                        {
                            english: {
                                some: {
                                    id: String(session.user.id)
                                }
                            },
                        },
                        {
                            russian: {
                                some: {
                                    id: String(session.user.id)
                                }
                            },
                        },
                        {
                            auding: {
                                some: {
                                    id: String(session.user.id)
                                }
                            },
                        },
                        {
                            speaking: {
                                some: {
                                    id: String(session.user.id)
                                }
                            },
                        },

                    ]
                },
            })

            return res.status(200).json(data);
        }

        const { method, word_id } : { method: MethodLearn, word_id: number } = JSON.parse(req.body)
        if(!method || !word_id){
            throw new Error(NOT_ALL_DATA_PROVIDED)
        }
        if(METHODS.includes(method)){
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
                    russian: {
                        connect: { id: word_id }
                    },
                    // spelling: {
                    //     connect: { id: word_id }
                    // },
                    auding: {
                        connect: { id: word_id }
                    },
                    speaking: {
                        connect: { id: word_id }
                    },
                },
                select: {
                    english: true,
                    russian: true,
                    // spelling: true,
                    auding: true,
                    speaking: true,
                }
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
                    },
                    russian: {
                        disconnect: { id: +word_id }
                    },
                    // spelling: {
                    //     disconnect: { id: +word_id }
                    // },
                    auding: {
                        disconnect: { id: +word_id }
                    },
                    speaking: {
                        disconnect: { id: +word_id }
                    },
                },
                select: {
                    english: true,
                    russian: true,
                    // spelling: true,
                    auding: true,
                    speaking: true,
                }
            })
            return res.status(200).json(data);
        }
    }catch(e){
        return res.status(500).send(e.message);
    }
}