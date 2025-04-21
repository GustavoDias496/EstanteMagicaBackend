import { prisma } from "../../prisma";

export const DeleteById = async (id: number): Promise<void | Error> => {
    try {

        const existingLend = await prisma.lend.findUnique({
            where: { id }
        });

        if(!existingLend){
            return new Error('Empréstimo não encontrado!');
        }

        await prisma.lend.delete({
            where: { id }
        });

        return;
        
    } catch (error) {
        console.error(error);
        return new Error('Erro ao deletar a empréstimo!');
    }
};