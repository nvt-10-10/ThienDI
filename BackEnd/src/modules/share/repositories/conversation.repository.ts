import { Conversation } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class ConversationRepository extends BaseRepository<Conversation> {
  constructor() {
    super(Conversation)
  }
}