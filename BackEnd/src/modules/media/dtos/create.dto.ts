import { MediaType } from '@app/prototype/enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({ description: 'ID danh mục', example: 1 })
  @IsNumber()
  @Type(() => Number)
  category_id: number;

  @ApiProperty({ description: 'Tiêu đề bộ sưu tập', example: 'Tráp cưới truyền thống đẹp' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Mô tả ngắn bộ sưu tập', example: 'Tráp cưới cao cấp cho mùa cưới 2025' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: MediaType, description: 'Loại media: image hoặc video' })
  @IsEnum(MediaType)
  @IsNotEmpty()
  type: MediaType;

  @ApiProperty({ description: 'Ảnh đại diện/thumbnail', example: 'prod-1.jpg' })
  @ValidateIf(o => o.type === MediaType.IMAGE || o.type === MediaType.VIDEO) // bắt buộc khi type = image hoặc video
  @IsNotEmpty({ message: 'Thumbnail không được để trống khi type là image hoặc video' })
  thumbnail?: string

  @ApiProperty({ description: 'Video bộ sưu tập', example: 'prod-1.mp4' })
  @ValidateIf(o => o.type === MediaType.VIDEO) // bắt buộc khi type = video
  @IsNotEmpty({ message: 'Video không được để trống khi type là video' })
  video?: string;

  @ApiProperty({ description: 'Trạng thái hiển thị bộ sưu tập', default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  url?: string;
}
