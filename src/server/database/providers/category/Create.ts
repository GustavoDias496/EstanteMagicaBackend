import { ICategory } from "../../models/Category";
import { prisma } from "../../prisma";

export const Create = async (category: Omit<ICategory, 'id'>): Promise<number | Error> => {
    try {

        const newCategory = await prisma.category.create({
            data: { 
                ...category
            }
        });
        
        return newCategory.id;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao cadastrar a categoria!');
    }
}