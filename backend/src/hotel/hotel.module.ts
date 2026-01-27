import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { HotelRepository } from './hotel.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [HotelController],
  providers: [
    HotelService,
    HotelRepository,
    PrismaService,
  ],
})
export class HotelModule {}
