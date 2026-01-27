import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaRepository<T, CreateDTO = any, UpdateDTO = any> {
  constructor(protected readonly model: any) {}

  async findMany(args?: Prisma.Args<T, 'findMany'>) {
    try {
      return await this.model.findMany(args);
    } catch {
      throw new InternalServerErrorException('Failed to fetch records');
    }
  }

  async findUnique(args: Prisma.Args<T, 'findUnique'>) {
    try {
      const result = await this.model.findUnique(args);
      if (!result) throw new NotFoundException('Record not found');
      return result;
    } catch {
      throw new InternalServerErrorException('Failed to fetch record');
    }
  }

  async create(data: CreateDTO) {
    try {
      return await this.model.create({ data });
    } catch {
      throw new InternalServerErrorException('Failed to create record');
    }
  }

  async update(where: any, data: UpdateDTO) {
    try {
      return await this.model.update({ where, data });
    } catch {
      throw new InternalServerErrorException('Failed to update record');
    }
}

  async updateMany(where: any, data: any) {
    try {
      return await this.model.updateMany({ where, data });
    } catch {
      throw new InternalServerErrorException('DB updateMany failed');
    }
  }


  async delete(where: any) {
    try {
      return await this.model.delete({ where });
    } catch {
      throw new InternalServerErrorException('Failed to delete record');
    }
  }
}
