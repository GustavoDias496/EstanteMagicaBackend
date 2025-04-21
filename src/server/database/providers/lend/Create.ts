import { ILend } from "../../models/Lend";
import { prisma } from "../../prisma";

export const Create = async (lend: Omit<ILend, 'id'>): Promise<number | Error> => {
    try {

        const newLend = await prisma.lend.create({
            data: {
                ...lend
            }
        });

        return newLend.id;
        
    } catch (error) {
        console.error(error);
        return new Error('Erro ao criar empréstimo!');
    }
};