import { ICategory } from "../../models/Category";
import { prisma } from "../../prisma";

export const GetAll = async (page: number = 1, limit: number = 10): Promise<ICategory[] | Error> => {
    try {
        const skip = (page - 1) * limit;

        const categorys = await prisma.category.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: 'desc'
            }
        });

        return categorys;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar categorias!');
    }
};