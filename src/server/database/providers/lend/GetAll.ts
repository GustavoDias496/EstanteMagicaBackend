import { ILend } from "../../models/Lend";
import { prisma } from "../../prisma";

export const GetAll = async (page: number = 1, limit: number = 10): Promise<ILend[] | Error> => {
    try {
        const skip = (page - 1) * limit;

        const lends = await prisma.lend.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: 'desc'
            }
        });

        return lends;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar empréstimos!');
    }
};