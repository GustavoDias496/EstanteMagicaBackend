import { IMember } from "../../models/Member";
import { prisma } from "../../prisma";

export const GetAll = async (page: number = 1, limit: number = 10): Promise<IMember[] | Error>=> {
    try {
        const pageNumber = Math.max(1, Number(page)) || 1;
        const limitNumber = Math.min(Math.max(1, Number(limit)), 100) || 10;

        const totalMembers = await prisma.member.count();
        if (totalMembers === 0) return [];

        const totalPages = Math.ceil(totalMembers / limitNumber);
        const currentPage = Math.min(pageNumber, totalPages);
        const skip = (currentPage - 1) * limitNumber;

        const members = await prisma.member.findMany({
            skip,
            take: limitNumber,
            orderBy: {
                id: 'asc'
            }
        });
        
        return members;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao buscar membros!');
    }
}