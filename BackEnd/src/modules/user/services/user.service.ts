import { UserRepository } from "@app/modules/share/repositories";
import { Injectable } from "@nestjs/common";
import { DataSource, ILike } from "typeorm";
import { IUserService } from "../interfaces/user.service.interface";
import { IFilterQuery } from "@app/prototype/interfaces";
import { handleException } from "@app/utils";
import { FindOptions } from "@app/prototype/types";
import { User } from "@app/entities";

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly dataSource: DataSource,
  ) {
  }

  async getListUser(filter: IFilterQuery) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const options: FindOptions<User> = {
          fields: ["email", "status", "id"],
          where: {
            ...(filter.search ? { email: ILike(`%${filter.search}%`) } : {}),
            ...(filter.status ? { status: filter.status } : {})
          },
          paginate: {
            page: filter.page,
            size: filter.size,
          },
          sort: {
            sort_by: filter.sort_by,
            order: filter.order
          }

        }
        return await this.userRepo.findWithPagination(manager, options)
      })
    } catch (error) {
      handleException(error)
    }
  }

}