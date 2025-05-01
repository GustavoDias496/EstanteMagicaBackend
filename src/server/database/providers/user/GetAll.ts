import { IUser } from "../../models/Users";
import { prisma } from '../../prisma';

export const GetAll = async (
    page: number = 1, 
    limit: number = 10
): Promise<IUser[] | Error> => {
    try {
        const pageNumber = Math.max(1, Number(page)) || 1;
        const limitNumber = Math.min(Math.max(1, Number(limit)), 100) || 10;

        const totalUsers = await prisma.users.count();
        if (totalUsers === 0) return [];

        const totalPages = Math.ceil(totalUsers / limitNumber);
        const currentPage = Math.min(pageNumber, totalPages);
        const skip = (currentPage - 1) * limitNumber;

        const users = await prisma.users.findMany({
            skip,
            take: limitNumber,
            orderBy: { id: 'asc' }
        });

        return users;

    } catch (error) {
        console.error('Erro detalhado:', error);
        return new Error('Erro ao buscar usuários');
    }
};