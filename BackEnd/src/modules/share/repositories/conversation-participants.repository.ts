import { ConversationParticipant } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class ConversationParticipantRepository extends BaseRepository<ConversationParticipant> {
  constructor() {
    super(ConversationParticipant)
  }
}