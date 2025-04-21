import { IMember } from "../../models/Member";
import { prisma } from "../../prisma";

export const UpdateById = async (id: number, member: Omit<IMember, 'id'>): Promise<void | Error> => {
    
    try {
        
        const existingMember = await prisma.member.findUnique({
            where: { id }
        });

        if(!existingMember){
            return new Error('Membro não encontrado!');
        }

        await prisma.member.update({
            where: { id },
            data: {
                ...member,
            }
        });

        return   
    } catch (error) {
        console.error(error);
        return new Error('Erro ao atualizar membro!');
    }
};