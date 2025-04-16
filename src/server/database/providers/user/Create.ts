import { IUser } from "../../models/User";
import { prisma } from '../../prisma';

export const Create = async (user: Omit<IUser, 'id'>): Promise<number | Error> =>{
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email: user.email }
        });

        if(existingUser){
            return new Error('Usuário já cadastrado!');
        }

        const newUser = await prisma.user.create({
            data: {
                ...user
            }
        });

        return newUser.id;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao cadastrar o usuário!')
    }
};