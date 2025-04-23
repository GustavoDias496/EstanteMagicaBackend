import { PasswordCrypto } from "../../../shared/services";
import { IUser } from "../../models/Users";
import { prisma } from '../../prisma';

export const UpdateById = async (id: number, user: Omit<IUser, 'id'>): Promise<void | Error> =>{
    try {
        
        const existingUser = await prisma.users.findUnique({
            where:{
                id
            }
        });

        if(!existingUser){
            return new Error('Usuário não encontrado!')
        }

        const hashedPassword = await PasswordCrypto.hashPassword(user.password);

        await prisma.users.update({
            where: { id },
            data: {
                ...user,
                password: hashedPassword
            }
        });

        return;

    } catch (error) {
        console.error(error);
        return new Error('Erro ao atualizar usuário!')
    }
};