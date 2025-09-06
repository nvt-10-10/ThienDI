import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ description: 'ID danh mục', example: 1 })
  @IsNumber()
  @Type(() => Number)
  category_id: number;

  @ApiProperty({ description: 'Tiêu đề bài viết', example: 'Tráp cưới truyền thống đẹp' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Mô tả ngắn bài viết', example: 'Tráp cưới cao cấp cho mùa cưới 2025' })
  @IsString()
  @IsOptional()
  excerpt?: string;

  @ApiProperty({ description: 'Nội dung bài viết', example: 'Tráp cưới cao cấp cho mùa cưới 2025' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Ảnh đại diện/thumbnail', example: 'prod-1.jpg' })
  @IsNotEmpty({ message: 'Thumbnail không được để trống khi type là image hoặc video' })
  thumbnail?: string


  @ApiProperty({ description: 'Trạng thái hiển thị bài viết', default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  url?: string;
}
