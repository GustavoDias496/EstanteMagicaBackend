import { IMember } from "../../models/Member";
import { prisma } from "../../prisma";

export const Create = async (member: Omit<IMember, 'id'>): Promise<number | Error> => {
    try {

        const newMember = await prisma.member.create({
            data: {
                ...member
            }
        });
        
        return newMember.id;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao cadastrar o membro!');
    }
}