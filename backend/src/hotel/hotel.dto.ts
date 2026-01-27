// src/hotel/dto/book-room.dto.ts
import { IsInt, Min, Max } from 'class-validator';

export class BookRoomDto {
  @IsInt()
  @Min(1)
  @Max(5)
  count: number;
}
