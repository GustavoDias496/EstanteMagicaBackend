import { ICategory } from "../../models/Category";
import { prisma } from "../../prisma";

export const GetById = async (id: number): Promise<ICategory | Error> => {
    try {
        
        const category = await prisma.category.findUnique({
            where: {
                id
            }
        });

        if(category) return category;

        return new Error('Categoria não encontrada');
        
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar categoria!');
    }
};