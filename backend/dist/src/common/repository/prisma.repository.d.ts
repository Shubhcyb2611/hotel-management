import { Prisma } from '@prisma/client';
export declare class PrismaRepository<T, CreateDTO = any, UpdateDTO = any> {
    protected readonly model: any;
    constructor(model: any);
    findMany(args?: Prisma.Args<T, 'findMany'>): Promise<any>;
    findUnique(args: Prisma.Args<T, 'findUnique'>): Promise<any>;
    create(data: CreateDTO): Promise<any>;
    update(where: any, data: UpdateDTO): Promise<any>;
    updateMany(where: any, data: any): Promise<any>;
    delete(where: any): Promise<any>;
}
