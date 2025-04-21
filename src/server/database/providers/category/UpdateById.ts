import { ICategory } from "../../models/Category";
import { prisma } from "../../prisma";

export const UpdateById = async (id: number, category: ICategory): Promise<void | Error> => {
    try {
        
        const existingCategory = await prisma.category.findUnique({
            where: { id }
        });

        if(!existingCategory){
            return new Error('Categoria não encontrada!');
        }

        await prisma.category.update({
            where: { id },
            data: {
                ...category
            }
        })
        
        return;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao atualizar a categoria!');
    }
};