import { ICategory } from "../../models/Category";
import { prisma } from "../../prisma";

export const GetAll = async (page: number = 1, limit: number = 10): Promise<ICategory[] | Error> => {
    try {
        const pageNumber = Math.max(1, Number(page)) || 1;
        const limitNumber = Math.min(Math.max(1, Number(limit)), 100) || 10;

        const totalCategorys = await prisma.category.count();
        if (totalCategorys === 0) return [];

        const totalPages = Math.ceil(totalCategorys / limitNumber);
        const currentPage = Math.min(pageNumber, totalPages);
        const skip = (currentPage - 1) * limitNumber;

        const categorys = await prisma.category.findMany({
            skip,
            take: limitNumber,
            orderBy: {
                id: 'asc'
            }
        });

        return categorys;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar categorias!');
    }
};