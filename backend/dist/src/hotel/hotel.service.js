"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelService = void 0;
const common_1 = require("@nestjs/common");
const hotel_repository_1 = require("./hotel.repository");
let HotelService = class HotelService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAllRooms() {
        return this.repo.findMany({
            orderBy: [
                { floor: 'asc' },
                { position: 'asc' },
            ],
        });
    }
    async bookRooms(count) {
        if (count < 1 || count > 5) {
            throw new common_1.BadRequestException('1–5 rooms allowed');
        }
        const rooms = await this.repo.findMany({
            where: { isAvailable: true },
            orderBy: [{ floor: 'asc' }, { position: 'asc' }],
        });
        if (rooms.length < count) {
            throw new common_1.BadRequestException('Not enough rooms');
        }
        const selected = this.selectBestRooms(rooms, count);
        await Promise.all(selected.map((r) => this.repo.update({ roomNumber: r.roomNumber }, { isAvailable: false })));
        return selected;
    }
    async reset() {
        return this.repo.updateMany({}, { isAvailable: true });
    }
    async randomize() {
        const rooms = await this.repo.findMany();
        return Promise.all(rooms.map((r) => this.repo.update({ roomNumber: r.roomNumber }, { isAvailable: Math.random() > 0.5 })));
    }
    selectBestRooms(rooms, count) {
        const byFloor = new Map();
        for (const r of rooms) {
            if (!byFloor.has(r.floor))
                byFloor.set(r.floor, []);
            byFloor.get(r.floor).push(r);
        }
        for (const floorRooms of byFloor.values()) {
            if (floorRooms.length >= count) {
                return floorRooms.slice(0, count);
            }
        }
        return rooms.slice(0, count);
    }
};
exports.HotelService = HotelService;
exports.HotelService = HotelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hotel_repository_1.HotelRepository])
], HotelService);
//# sourceMappingURL=hotel.service.js.map