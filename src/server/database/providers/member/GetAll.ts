import { IMember } from "../../models/Member";
import { prisma } from "../../prisma";

export const GetAll = async (page: number = 1, limit: number = 10): Promise<IMember[] | Error>=> {
    try {
        const skip = (page - 1) * limit;

        const members = await prisma.member.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: 'desc'
            }
        });
        
        return members;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar membros!');
    }
}