import { ILend } from "../../models/Lend";
import { prisma } from "../../prisma";

export const GetById = async (id: number): Promise<ILend | Error> => {
    try {
        
        const lend = await prisma.lend.findUnique({
            where: {
                id
            }
        });

        if(lend) return lend;

        return new Error('Empréstimo não encontrado');
        
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar empréstimo!');
    }
};