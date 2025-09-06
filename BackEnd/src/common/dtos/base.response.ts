import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  http_code: number;

  @ApiProperty({ example: 'Thành công', description: 'Thông báo phản hồi' })
  msg: string;
  data: T | null;
}
