import { prisma } from "../../prisma"

export const DeleteById = async (id: number): Promise<void | Error> => {
    try {
        const existingBook = await prisma.book.findUnique({
            where: { id }
        });

        if(!existingBook){
            return new Error('Livro não encontrado!');
        }

        await prisma.book.delete({
            where: { id }
        });

        return;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao apagar o livro!');
    }
}