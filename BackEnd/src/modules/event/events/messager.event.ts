import { CreateMessageDto } from "@app/modules/message/dtos";
import { MessagerService } from "@app/modules/message/services";
import { MessageEventEnum } from "@app/prototype/enum";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class MessageEvent {
  constructor(private readonly messagerService: MessagerService) { }

  @OnEvent(MessageEventEnum.MESSAGE_CREATED)
  async handleCreateMessageEvent(payload: CreateMessageDto) {
    await this.messagerService.createMessage(payload)
  }
}