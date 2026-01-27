import { Injectable, BadRequestException } from '@nestjs/common';
import { HotelRepository } from './hotel.repository';
import { Room } from '@prisma/client';

@Injectable()
export class HotelService {
  constructor(private readonly repo: HotelRepository) {}

  async getAllRooms(): Promise<Room[]> {
    return this.repo.findMany({
      orderBy: [
        { floor: 'asc' },
        { position: 'asc' },
      ],
    });
  }
  async bookRooms(count: number) {
    if (count < 1 || count > 5) {
      throw new BadRequestException('1–5 rooms allowed');
    }

    const rooms = await this.repo.findMany({
      where: { isAvailable: true },
      orderBy: [{ floor: 'asc' }, { position: 'asc' }],
    });

    if (rooms.length < count) {
      throw new BadRequestException('Not enough rooms');
    }

    const selected = this.selectBestRooms(rooms, count);

    await Promise.all(
      selected.map((r: Room) =>
        this.repo.update(
          { roomNumber: r.roomNumber },
          { isAvailable: false },
        ),
      ),
    );

    return selected;
  }

  async reset() {
    return this.repo.updateMany({}, { isAvailable: true });
  }

  async randomize() {
    const rooms = await this.repo.findMany();

    return Promise.all(
      rooms.map((r: Room) =>
        this.repo.update(
          { roomNumber: r.roomNumber },
          { isAvailable: Math.random() > 0.5 },
        ),
      ),
    );
  }

  private selectBestRooms(rooms: Room[], count: number): Room[] {
    const byFloor = new Map<number, Room[]>();

    for (const r of rooms) {
      if (!byFloor.has(r.floor)) byFloor.set(r.floor, []);
      byFloor.get(r.floor)!.push(r);
    }

    // same floor first
    for (const floorRooms of byFloor.values()) {
      if (floorRooms.length >= count) {
        return floorRooms.slice(0, count);
      }
    }

    // fallback
    return rooms.slice(0, count);
  }
}
