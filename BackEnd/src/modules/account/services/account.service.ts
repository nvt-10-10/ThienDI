import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager, FindOptionsWhere } from "typeorm";
import { FindOptions } from "@app/prototype/types";
import { handleException } from "@app/utils";
import { UserRepository } from "@app/modules/share/repositories";
import { User } from "@app/entities";

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepo: UserRepository,
    private readonly dataSource: DataSource
  ) {
  }

  async findAll() {
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        let options: FindOptions<User>
        options.fields = ["id", "email", "accountname", "role"]
        options.relations = []
        return await this.accountRepo.findAll(manager, options)
      })
    } catch (error) {
      handleException(error)
    }
  }

  async getInfo(account_id: number): Promise<User> {
    try {
      return await this.dataSource.transaction(async (manager: EntityManager) => {
        const where: FindOptionsWhere<User> = {
          id: account_id
        }
        const options: FindOptions<User> = {
          fields: ["id", "email", "username", "role"],
          where
        }
        return await this.accountRepo.findOne(manager, options)
      })
    } catch (error) {
      handleException(error)
    }
  }
}