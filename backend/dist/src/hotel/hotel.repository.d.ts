import { Room } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaRepository } from '../common/repository/prisma.repository';
export declare class HotelRepository extends PrismaRepository<Room> {
    constructor(prisma: PrismaService);
}
