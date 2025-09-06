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

export class RegisterResponse {
  @ApiProperty({ type: () => UserDto, description: 'Thông tin người dùng sau khi đăng ký' })
  user: UserDto;
}

export class RegisterSuccessResponseDto extends BaseResponseDto<RegisterResponse> {

}