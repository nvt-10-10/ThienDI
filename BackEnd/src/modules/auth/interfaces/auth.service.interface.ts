import { LoginDto, RegisterDto } from "../dtos";
import { LoginResponse, RegisterResponse } from "../responses";

export interface IAuthService {
  login(dto: LoginDto): Promise<LoginResponse>
  register(dto: RegisterDto): Promise<RegisterResponse>
}