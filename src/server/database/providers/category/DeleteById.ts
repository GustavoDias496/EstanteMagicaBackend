import { prisma } from "../../prisma";

export const DeleteById = async (id: number): Promise<void | Error> => {
    try {

        const existingCategory = await prisma.category.findUnique({
            where: { id }
        });

        if(!existingCategory){
            return new Error('Categoria não encontrada!');
        }

        await prisma.category.delete({
            where: { id }
        });

        return;
        
    } catch (error) {
        console.error(error);
        return new Error('Erro ao deletar a categoria!');
    }
};