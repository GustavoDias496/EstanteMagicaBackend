import { prisma } from "../../prisma"

export const DeleteById = async (id: number): Promise<void | Error> => {
    try {
        const existingMember = await prisma.member.findUnique({
            where: { id }
        });

        if(!existingMember){
            return new Error('Membro não encontrado!');
        }

        await prisma.member.delete({
            where: { id }
        });

        return;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao apagar o membro!');
    }
}