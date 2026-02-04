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
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUnique(args: Prisma.Args<T, 'findUnique'>) {
    try {
      const result = await this.model.findUnique(args);
      if (!result) throw new NotFoundException('Record not found');
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(data: CreateDTO) {
    try {
      return await this.model.create({ data });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(where: any, data: UpdateDTO) {
    try {
      return await this.model.update({ where, data });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateMany(where: any, data: any) {
    try {
      return await this.model.updateMany({ where, data });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(where: any) {
    try {
      return await this.model.delete({ where });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
