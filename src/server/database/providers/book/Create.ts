import { IBook } from "../../models/Book";
import { prisma } from "../../prisma";

export const Create = async (book: Omit<IBook, 'id'>): Promise<number | Error> => {
    try {

        const newBook = await prisma.book.create({
            data: {
                ...book
            }
        });
        
        return newBook.id;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao cadastrar o usuário!');
    }
}