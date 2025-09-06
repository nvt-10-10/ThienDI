import { Module } from "@nestjs/common";
import { AccountController } from "./controllers/account.controller";
import { AccountService } from "./services";
import { UserRepository } from "../share/repositories";

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService, UserRepository]
})
export class AccountModule { }