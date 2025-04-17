import { IBook } from "../../models/Book";
import { prisma } from "../../prisma";

export const UpdateById = async (id: number, book: Omit<IBook, 'id'>): Promise<void | Error> => {
    
    try {
        
        const existingBook = await prisma.book.findUnique({
            where: { id }
        });

        if(!existingBook){
            return new Error('Livro não encontrado!');
        }

        await prisma.book.update({
            where: { id },
            data: {
                ...book,
            }
        });

        return   
    } catch (error) {
        console.error(error);
        return new Error('Erro ao atualizar livro!');
    }
};