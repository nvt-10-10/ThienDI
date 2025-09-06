import { IsEmail, IsOptional, IsStrongPassword } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string

  @IsOptional()
  username: string

  @IsStrongPassword()
  password: string;
}