import { PasswordCrypto } from "../../../shared/services";
import { IUser } from "../../models/Users";
import { prisma } from '../../prisma';

export const Create = async (user: Omit<IUser, 'id'>): Promise<number | Error> =>{
    try {
        const existingUser = await prisma.users.findUnique({
            where: { email: user.email }
        });

        if(existingUser){
            return new Error('Usuário já cadastrado!');
        }

        const hashedPassword = await PasswordCrypto.hashPassword(user.password);

        const newUser = await prisma.users.create({
            data: {
                ...user,
                password: hashedPassword
            }
        });

        return newUser.id;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao cadastrar o usuário!')
    }
};