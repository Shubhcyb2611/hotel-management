import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaRepository } from '../common/repository/prisma.repository';

@Injectable()
export class HotelRepository extends PrismaRepository<Room> {
  constructor(prisma: PrismaService) {
    super(prisma.room);
  }
}
