import { HotelService } from './hotel.service';
export declare class HotelController {
    private readonly hotelService;
    constructor(hotelService: HotelService);
    bookRooms(count: number): Promise<{
        roomNumber: number;
        floor: number;
        position: number;
        isAvailable: boolean;
    }[]>;
    resetRooms(): Promise<any>;
    randomizeRooms(): Promise<any[]>;
    getAllRooms(): Promise<{
        roomNumber: number;
        floor: number;
        position: number;
        isAvailable: boolean;
    }[]>;
}
