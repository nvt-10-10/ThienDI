import { Public } from "@app/core/decorator";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../services";
import { LoginDto, RegisterDto } from "../dtos";
import { HttpResponse } from "@app/common/response";
import { LoginResponse, RegisterResponse } from "../responses";

@Public()
@Controller("/api/user/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  async login(@Body() dto: LoginDto): Promise<HttpResponse<LoginResponse>> {
    const result = await this.authService.login(dto)
    return HttpResponse.success("Đăng nhập thành công", result)
  }

  @Post("/register")
  async register(@Body() dto: RegisterDto): Promise<HttpResponse<RegisterResponse>> {
    const result = await this.authService.register(dto)
    return HttpResponse.success("Đăng ký thành công", result, HttpStatus.CREATED)
  }
}