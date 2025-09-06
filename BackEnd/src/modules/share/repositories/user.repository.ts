import { User } from "@app/entities/user.entity";
import { BaseRepository } from "@app/modules/core/repositories";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User)
  }
}