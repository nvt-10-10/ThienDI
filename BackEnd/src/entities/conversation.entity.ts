import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { ConversationParticipant } from './conversation-participants.entity';
import { BaseEntity } from './base.entity';

@Entity('conversations')
export class Conversation extends BaseEntity {
  @Column({ comment: 'Tiêu đề cuộc trò chuyện (chỉ nhóm mới có)', nullable: true })
  title?: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'true nếu là group chat, false nếu là chat 1-1',
  })
  is_group: boolean;

  @Column({ name: 'last_message_id', nullable: true, comment: 'ID tin nhắn cuối cùng' })
  last_message_id: number;

  @Column({ nullable: true, comment: 'Nội dung tin nhắn cuối cùng' })
  last_message_preview: string;

  @Column({ type: 'timestamp', nullable: true, comment: 'Thời gian gửi tin nhắn cuối' })
  last_message_at: Date;

  @OneToMany(() => ConversationParticipant, (cp) => cp.conversation)
  participants: ConversationParticipant[];

}
