import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { beforeEach } from 'vitest';

//*  deep mocking
export const prismaClient = mockDeep<PrismaClient>();