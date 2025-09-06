import { Controller, Get } from "@nestjs/common";
import { AccountService } from "../services";
import { Auth, AuthPayload } from "@app/core/decorator";
import { HttpResponse } from "@app/common/response";
import { User } from "@app/entities";

@Controller("api/user/account")
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get("/info")
  async getInfo(@Auth() auth: AuthPayload): Promise<HttpResponse<User>> {
    const result = await this.accountService.getInfo(auth.id)
    return HttpResponse.success("Lấy thông tin người dùng", result)
  }
}