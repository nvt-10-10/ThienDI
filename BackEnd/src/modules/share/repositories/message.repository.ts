import { Message } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class MessageRepository extends BaseRepository<Message> {
  constructor() {
    super(Message)
  }
}