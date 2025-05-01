import { ILend } from "../../models/Lend";
import { prisma } from "../../prisma";

export const GetAll = async (page: number = 1, limit: number = 10): Promise<ILend[] | Error> => {
    try {
        const pageNumber = Math.max(1, Number(page)) || 1;
        const limitNumber = Math.min(Math.max(1, Number(limit)), 100) || 10;

        const totalLends = await prisma.lend.count();
        if (totalLends === 0) return [];

        const totalPages = Math.ceil(totalLends / limitNumber);
        const currentPage = Math.min(pageNumber, totalPages);
        const skip = (currentPage - 1) * limitNumber;

        const lends = await prisma.lend.findMany({
            skip,
            take: limitNumber,
            orderBy: {
                id: 'asc'
            }
        });

        return lends;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar empréstimos!');
    }
};