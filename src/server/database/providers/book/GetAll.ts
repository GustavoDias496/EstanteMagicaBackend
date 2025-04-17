import { IBook } from "../../models/Book";
import { prisma } from "../../prisma";

export const GetAll = async (page: number = 1, limit: number = 10): Promise<IBook[] | Error>=> {
    try {
        const skip = (page - 1) * limit;

        const books = await prisma.book.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: 'desc'
            }
        });
        
        return books;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar livros!');
    }
}