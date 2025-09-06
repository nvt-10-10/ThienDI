import { Module } from "@nestjs/common";
import { UserService } from "./services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/entities";
import { UserRepository } from "../share/repositories";
import { UserAdminController } from "./controllers";

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserAdminController],

  providers: [
    UserService,
    UserRepository
  ],
})
export class UserModule { }
