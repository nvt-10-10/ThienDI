import { Module } from "@nestjs/common";
import { MessagerService } from "./services";
import { MessageRepository } from "../share/repositories";

@Module({
  imports: [],
  providers: [MessagerService, MessageRepository],
  exports: [MessagerService, MessageRepository]
})
export class MessageModule { }