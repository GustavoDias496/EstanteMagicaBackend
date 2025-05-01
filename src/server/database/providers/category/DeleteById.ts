import { prisma } from "../../prisma";

export const DeleteById = async (id: number): Promise<void | Error> => {
    try {

        const existingCategory = await prisma.category.findUnique({
            where: { id: Number(id) }
        });

        if(!existingCategory){
            return new Error('Categoria não encontrada!');
        }

        await prisma.category.delete({
            where: { id: Number(id) }
        });

        return;
        
    } catch (error) {
        console.error(error);
        return new Error('Erro ao deletar a categoria!');
    }
};