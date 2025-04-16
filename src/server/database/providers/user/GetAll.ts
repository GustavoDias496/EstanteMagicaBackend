import { IUser } from "../../models/User";
import { prisma } from '../../prisma';

export const GetAll = async (
    page: number = 1, 
    limit: number = 10
): Promise<IUser[] | Error> =>{
    try {
        const skip = (page - 1) * limit;
        
        const users = await prisma.user.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: 'desc'
            }
        });

        return users;

    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar usuários!')
    }
};