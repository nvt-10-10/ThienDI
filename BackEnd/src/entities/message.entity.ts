import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Conversation } from './conversation.entity';
import { BaseEntity } from './base.entity';

@Entity('messages')
export class Message extends BaseEntity {

  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column({ name: 'conversation_id', comment: 'ID cuộc trò chuyện' })
  conversation_id: number;

  @Column({ name: 'sender_id', nullable: true, comment: 'ID người gửi' })
  sender_id: number;

  @Column('text', { comment: 'Nội dung tin nhắn (text)' })
  content: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'true nếu là tin nhắn hệ thống (ví dụ: user rời khỏi nhóm)',
  })
  is_system: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Đường dẫn tệp đính kèm (nếu có)',
  })
  attachment_url: string;
}
