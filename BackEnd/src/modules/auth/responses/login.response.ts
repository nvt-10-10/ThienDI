import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@app/prototype/enum';
import { BaseResponseDto } from '@app/common/dtos';

class UserDto {
  @ApiProperty({ example: 1, description: 'ID của người dùng' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email của người dùng' })
  email: string;

  @ApiProperty({ example: RoleEnum.USER, enum: RoleEnum, description: 'Vai trò của người dùng' })
  role: RoleEnum;
}

export class LoginResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJudnR1eWVuMTAxMDIwMDJAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDIxOTMyMTksImV4cCI6MTc0MjI3OTYxOX0.if7uCKV8f0AVdFkNInyLK4y9vq8muZAK_rtHGgRPp88',
    description: 'JWT Token sau khi đăng nhập thành công',
  })
  access_token: string;
  @ApiProperty({ type: () => UserDto, description: 'Thông tin người dùng sau khi đăng nhập' })
  user: UserDto;
}


export class LoginSuccessResponseDto extends BaseResponseDto<LoginResponse> {

}