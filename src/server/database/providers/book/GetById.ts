import { IBook } from "../../models/Book";
import { prisma } from "../../prisma";

export const GetById = async (id: number): Promise<IBook | Error> => {
    try {
        
        const book = await prisma.book.findUnique({
            where: { id }
        });

        if(book) return book;

        return new Error('Livro não encontrado!');
    } catch (error) {
        console.error(error);
        return new Error('Error ao buscar livro!');
    }
};