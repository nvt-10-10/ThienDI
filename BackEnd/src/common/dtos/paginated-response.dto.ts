import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  size: number;

  @ApiProperty({ example: 100 })
  total_items: number;

  @ApiProperty({ example: 10 })
  total_pages: number;
}

// Dto phân trang dùng chung, truyền kiểu dữ liệu qua generic
export class PaginatedResponseDto<TData> {
  @ApiProperty({ isArray: true })
  @Type(() => Object) // override trong file sử dụng cụ thể
  items: TData[];

  @ApiProperty({ type: () => PaginationMetaDto })
  meta: PaginationMetaDto;
}
