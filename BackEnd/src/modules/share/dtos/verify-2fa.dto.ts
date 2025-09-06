import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Verify2FADto {
  @ApiProperty({
    description: "Khóa bí mật 2FA đã được tạo cho người dùng (base32)",
    example: "JBSWY3DPEHPK3PXP",
  })
  @IsString()
  secret: string;

  @ApiProperty({
    description: "Mã OTP do ứng dụng xác thực (Google Authenticator, Authy...) sinh ra",
    example: "123456",
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: "Thời điểm tạo mã xác thực, tính bằng milliseconds từ Epoch (dùng để kiểm tra trôi thời gian nếu cần)",
    example: 1720425600000,
  })
  @IsOptional()
  @IsNumber()
  timestamp: number;
}
