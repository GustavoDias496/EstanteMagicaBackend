import { prisma } from '../../prisma';

export const DeleteById = async (id: number): Promise<void | Error> =>{
    try {
        const existingUser = await prisma.user.findUnique({
            where: { id }
        });

        if(!existingUser){
            return new Error('Usuário não encontrado!');
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        });

        return;

    } catch (error) {
        console.error(error);
        return new Error('Erro ao apagar o usuário!')
    }
};