import supertest from 'supertest';
import { server } from '../src/server/Server';
import { PrismaClient } from '@prisma/client';

const testPrisma = new PrismaClient();

beforeAll(async () => {
    await testPrisma.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE`;
    await testPrisma.$executeRaw`CREATE SCHEMA public`;
    await testPrisma.$executeRaw`GRANT ALL ON SCHEMA public TO postgres`;
    await testPrisma.$executeRaw`GRANT ALL ON SCHEMA public TO public`;
    
    await testPrisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
});

afterAll(async () => {
    await testPrisma.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE`;
    await testPrisma.$executeRaw`CREATE SCHEMA public`;
    
    await testPrisma.$disconnect();
});

export const testServer = supertest(server);