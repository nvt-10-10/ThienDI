import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { parseStringArray } from '@app/helpers';

export class UpdateProductDto extends CreateProductDto {
  @ApiProperty({ description: 'ID sản phẩm', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Danh sách ảnh gallery cần xóa',
    example: ['img-old1.jpg', 'img-old2.jpg'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => parseStringArray(value))
  remove_gallery?: string[];

  @ApiProperty({
    description: 'Ảnh đại diện cũ cần xóa nếu có',
    example: 'old-thumbnail.jpg',
  })
  @IsString()
  @IsOptional()
  remove_thumbnail?: string;

  @ApiProperty({
    description: 'Video cũ cần xóa nếu có',
    example: 'old-thumbnail.jpg',
  })
  @IsString()
  @IsOptional()
  remove_video?: string;
}
