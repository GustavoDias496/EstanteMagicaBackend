import { ILend } from "../../models/Lend";
import { prisma } from "../../prisma";

export const UpdateById = async (id: number, lend: ILend): Promise<void | Error> => {
    try {
        
        const existingLend = await prisma.lend.findUnique({
            where: { id }
        });

        if(!existingLend){
            return new Error('Empréstimo não encontrado!');
        }

        await prisma.lend.update({
            where: { id },
            data: {
                ...lend
            }
        })
        
        return;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao atualizar a lend!');
    }
};