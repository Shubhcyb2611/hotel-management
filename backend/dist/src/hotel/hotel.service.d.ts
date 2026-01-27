import { HotelRepository } from './hotel.repository';
import { Room } from '@prisma/client';
export declare class HotelService {
    private readonly repo;
    constructor(repo: HotelRepository);
    getAllRooms(): Promise<Room[]>;
    bookRooms(count: number): Promise<{
        roomNumber: number;
        floor: number;
        position: number;
        isAvailable: boolean;
    }[]>;
    reset(): Promise<any>;
    randomize(): Promise<any[]>;
    private selectBestRooms;
}
