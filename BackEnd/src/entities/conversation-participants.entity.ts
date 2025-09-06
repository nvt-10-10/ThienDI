import {
  Entity,
  ManyToOne,
  Column,

  Unique,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Conversation } from './conversation.entity';
import { BaseEntity } from './base.entity';

@Entity('conversation_participants')
@Unique(['conversation', 'user'])
export class ConversationParticipant extends BaseEntity {

  @ManyToOne(() => Conversation, (conversation) => conversation.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.conversations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'conversation_id', comment: 'ID cuộc trò chuyện' })
  conversation_id: number;

  @Column({ name: 'user_id', comment: 'ID người tham gia' })
  user_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'member',
    comment: 'Vai trò trong cuộc trò chuyện: member, admin...',
  })
  role: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'Thời điểm người dùng đã đọc tin nhắn mới nhất',
  })
  last_seen_at: Date;
}
