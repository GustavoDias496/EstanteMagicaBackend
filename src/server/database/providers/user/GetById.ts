import { IUser } from "../../models/Users";
import { prisma } from '../../prisma';

export const GetById = async (id: number): Promise<IUser | Error> =>{
    try {
        
        const user = await prisma.users.findUnique({
            where:{
                id
            }
        });

        if(user) return user;

        return new Error('Usuário não encontrado')

    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar usuário!')
    }
};