import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  // ----------------------------
  // BOOK ROOMS
  // ----------------------------
  @Post('book')
  async bookRooms(@Body('count') count: number) {
    if (typeof count !== 'number') {
      throw new BadRequestException('count must be a number');
    }
    return this.hotelService.bookRooms(count);
  }

  // ----------------------------
  // RESET ALL ROOMS
  // ----------------------------
  @Post('reset')
  resetRooms() {
    return this.hotelService.reset();
  }

  // ----------------------------
  // RANDOMIZE ROOMS
  // ----------------------------
  @Post('randomize')
  randomizeRooms() {
    return this.hotelService.randomize();
  }

  // ----------------------------
  // GET ALL ROOMS (FOR UI)
  // ----------------------------
  @Get('rooms')
  getAllRooms() {
    return this.hotelService.getAllRooms();
  }
}
