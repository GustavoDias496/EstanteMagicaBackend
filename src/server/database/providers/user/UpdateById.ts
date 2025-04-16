import { IUser } from "../../models/User";
import { prisma } from '../../prisma';

export const UpdateById = async (id: number, user: IUser): Promise<void | Error> =>{
    try {
        
        const existingUser = await prisma.user.findUnique({
            where:{
                id
            }
        });

        if(!existingUser){
            return new Error('Usuário não encontrado!')
        }

        await prisma.user.update({
            where: { id },
            data: {
                ...user,
            }
        });

        return;

    } catch (error) {
        console.error(error);
        return new Error('Erro ao atualizar usuário!')
    }
};