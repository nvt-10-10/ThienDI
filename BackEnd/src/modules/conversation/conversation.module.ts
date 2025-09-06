import { Module } from "@nestjs/common";
import { ConversationController } from "./controllers";
import { ConversationService } from "./services";
import { ConversationRepository, MessageRepository, UserRepository } from "../share/repositories";
import { AiGroqService } from "../share/services";

@Module({
  imports: [],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository, MessageRepository, UserRepository,
    AiGroqService
  ],
  exports: [ConversationService, ConversationRepository]
})
export class ConversationModule { }