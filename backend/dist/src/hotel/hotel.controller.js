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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelController = void 0;
const common_1 = require("@nestjs/common");
const hotel_service_1 = require("./hotel.service");
let HotelController = class HotelController {
    constructor(hotelService) {
        this.hotelService = hotelService;
    }
    async bookRooms(count) {
        if (typeof count !== 'number') {
            throw new common_1.BadRequestException('count must be a number');
        }
        return this.hotelService.bookRooms(count);
    }
    resetRooms() {
        return this.hotelService.reset();
    }
    randomizeRooms() {
        return this.hotelService.randomize();
    }
    getAllRooms() {
        return this.hotelService.getAllRooms();
    }
};
exports.HotelController = HotelController;
__decorate([
    (0, common_1.Post)('book'),
    __param(0, (0, common_1.Body)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "bookRooms", null);
__decorate([
    (0, common_1.Post)('reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "resetRooms", null);
__decorate([
    (0, common_1.Post)('randomize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "randomizeRooms", null);
__decorate([
    (0, common_1.Get)('rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelController.prototype, "getAllRooms", null);
exports.HotelController = HotelController = __decorate([
    (0, common_1.Controller)('hotel'),
    __metadata("design:paramtypes", [hotel_service_1.HotelService])
], HotelController);
//# sourceMappingURL=hotel.controller.js.map