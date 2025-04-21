import { IMember } from "../../models/Member";
import { prisma } from "../../prisma";

export const GetById = async (id: number): Promise<IMember | Error> => {
    try {
        
        const member = await prisma.member.findUnique({
            where: { id }
        });

        if(member) return member;

        return new Error('Membro não encontrado!');
    } catch (error) {
        console.error(error);
        return new Error('Error ao buscar membro!');
    }
};