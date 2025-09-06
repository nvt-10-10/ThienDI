import { Conversation, ConversationParticipant, Message } from "@app/entities";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { MessageRepository } from "../../share/repositories";
import { CreateMessageDto } from "../dtos";

@Injectable()
export class MessagerService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly messageRepository: MessageRepository

  ) { }

  async createMessage(
    dto: CreateMessageDto
  ) {

    return await this.dataSource.transaction(async (manager) => {
      let conversation: Conversation | undefined;

      // Nếu đã truyền conversationId → dùng luôn
      if (dto.conversation_id) {
        conversation = await manager.findOne(Conversation, {
          where: { id: dto.conversation_id },
        });
      }

      // Nếu không có conversationId và là chat 1-1 → tìm xem đã tồn tại chưa
      if (!conversation && !dto.is_group) {
        conversation = await manager
          .createQueryBuilder(Conversation, "c")
          .innerJoin("c.participants", "cp1", "cp1.user_id = :userA", {
            userA: dto.sender_id,
          })
          .innerJoin("c.participants", "cp2", "cp2.user_id = :userB", {
            userB: dto.receiver_id,
          })
          .where("c.is_group = false")
          .getOne();

        // Nếu chưa có thì tạo mới conversation và participants
        if (!conversation) {
          conversation = await manager.save(Conversation, {
            is_group: false,
            title: null,
          });

          await manager.save(ConversationParticipant, [
            { user_id: dto.sender_id, conversation_id: conversation.id },
            { user_id: dto.receiver_id, conversation_id: conversation.id },
          ]);
        }
      }

      // Nếu tới đây vẫn không có conversation thì ném lỗi
      if (!conversation) {
        throw new Error("Conversation not found or not provided");
      }

      // Tạo tin nhắn
      const message = manager.create(Message, {
        conversation_id: conversation.id,
        sender_id: dto.sender_id,
        content: dto.content,
      });

      const newMessage = await manager.save(message);
      conversation.last_message_id = newMessage.id
      conversation.last_message_preview = newMessage.content;
      conversation.last_message_at = new Date();
      await manager.save(conversation)
    });
  }
}  