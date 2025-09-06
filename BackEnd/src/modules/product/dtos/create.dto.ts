import { parseStringArray } from '@app/helpers';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'ID danh mục', example: 1 })
  @IsNumber()
  @Type(() => Number)
  category_id: number;

  @ApiProperty({ description: 'Tên sản phẩm', example: 'Tráp cưới sen đỏ' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Tiêu đề sản phẩm', example: 'Tráp cưới truyền thống đẹp' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Mô tả ngắn sản phẩm', example: 'Tráp cưới cao cấp cho mùa cưới 2025' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Mô tả chi tiết sản phẩm', example: '<p>Chi tiết tráp cưới được làm bằng sen đỏ...</p>' })
  @IsString()
  @IsOptional()
  long_description?: string;

  @ApiProperty({ description: 'Giá thấp nhất', example: 1500000 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  price_min?: number;

  @ApiProperty({ description: 'Giá cao nhất', example: 3000000 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  price_max?: number;

  @ApiProperty({ description: 'Slug (URL thân thiện)', example: 'trap-cuoi-sen-do' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ description: 'Danh sách đặc điểm nổi bật', example: ['Thiết kế sang trọng', 'Nguyên liệu cao cấp'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseStringArray(value))
  features?: string[];

  @ApiProperty({ description: 'Tùy chọn cá nhân hóa', example: ['Kích thước lớn', 'Màu đỏ'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseStringArray(value))
  customization?: string[];

  @ApiProperty({ description: 'Ảnh đại diện sản phẩm', example: 'prod-1.jpg' })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ description: 'Video  sản phẩm', example: 'prod-1.mp4' })
  @IsString()
  @IsOptional()
  video?: string;

  @ApiProperty({
    description: 'Danh sách ảnh phụ (gallery)',
    example: ['img1.jpg', 'img2.jpg'],
    type: [String],
    maxItems: 6,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ArrayMaxSize(6)
  gallery?: string[];

  @ApiProperty({ description: 'Trạng thái hiển thị sản phẩm', default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
