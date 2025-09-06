import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6) // chỉ cần kiểm tra độ dài tối thiểu
  password: string;
}