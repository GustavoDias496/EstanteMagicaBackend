import { prisma } from '../../prisma';

export const DeleteById = async (id: number): Promise<void | Error> =>{
    try {
        const existingUser = await prisma.users.findUnique({
            where: { id: Number(id) }
        });

        if(!existingUser){
            return new Error('Usuário não encontrado!');
        }

        await prisma.users.delete({
            where: {
                id: Number(id)
            }
        });

        return;

    } catch (error) {
        console.error(error);
        return new Error('Erro ao apagar o usuário!')
    }
};