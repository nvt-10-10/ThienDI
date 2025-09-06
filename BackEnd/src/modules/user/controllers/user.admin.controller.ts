import { FilterQuery, Public } from "@app/core/decorator";
import { Controller, Get } from "@nestjs/common";
import { UserService } from "../services";
import { HttpResponse } from "@app/common/response";
import { IFilterQuery } from "@app/prototype/interfaces";
import { UserStatusEnum } from "@app/prototype/enum";

@Public()
@Controller("/api/admin/users")
export class UserAdminController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getListUser(@FilterQuery({ sortFields: ["id", "email"], statusType: UserStatusEnum }) filter: IFilterQuery): Promise<HttpResponse<any>> {
    const result = await this.userService.getListUser(filter)
    return HttpResponse.success("Lấy danh sách thông tin người dùng thành công", result)
  }

}