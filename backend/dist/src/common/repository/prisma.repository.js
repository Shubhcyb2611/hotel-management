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
exports.PrismaRepository = void 0;
const common_1 = require("@nestjs/common");
let PrismaRepository = class PrismaRepository {
    constructor(model) {
        this.model = model;
    }
    async findMany(args) {
        try {
            return await this.model.findMany(args);
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to fetch records');
        }
    }
    async findUnique(args) {
        try {
            const result = await this.model.findUnique(args);
            if (!result)
                throw new common_1.NotFoundException('Record not found');
            return result;
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to fetch record');
        }
    }
    async create(data) {
        try {
            return await this.model.create({ data });
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to create record');
        }
    }
    async update(where, data) {
        try {
            return await this.model.update({ where, data });
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to update record');
        }
    }
    async updateMany(where, data) {
        try {
            return await this.model.updateMany({ where, data });
        }
        catch {
            throw new common_1.InternalServerErrorException('DB updateMany failed');
        }
    }
    async delete(where) {
        try {
            return await this.model.delete({ where });
        }
        catch {
            throw new common_1.InternalServerErrorException('Failed to delete record');
        }
    }
};
exports.PrismaRepository = PrismaRepository;
exports.PrismaRepository = PrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], PrismaRepository);
//# sourceMappingURL=prisma.repository.js.map