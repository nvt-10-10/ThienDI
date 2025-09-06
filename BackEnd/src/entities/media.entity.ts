import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { MediaCategory } from './media-category.entity';
import { MediaType } from '@app/prototype/enum';


@Entity('medias')
export class Media extends BaseEntity {
  @Column({
    name: "category_id",
    type: "int",
    nullable: false,
    comment: "Khóa ngoại của danh mục (chỉ lưu ID)"
  })
  category_id: number;

  @Column({
    type: 'enum',
    enum: MediaType,
    comment: 'Loại media: image hoặc video',
  })
  type: MediaType;

  @Column({
    comment: 'Đường dẫn URL đến file media (ảnh hoặc video)',
  })
  url: string;

  @Column({
    nullable: true,
    comment: 'Ảnh thumbnail (dùng cho video hoặc ảnh đại diện)',
  })
  thumbnail?: string;

  @Column({
    nullable: true,
    comment: 'Tiêu đề của media',
  })
  title?: string;

  @Column({
    nullable: true,
    type: 'text',
    comment: 'Mô tả chi tiết về media',
  })
  description?: string;

  @Column({
    name: "is_active",
    type: "boolean",
    default: true,
    comment: "Trạng thái hiển thị  (true: hiện, false: ẩn)"
  })
  is_active: boolean;

  @ManyToOne(() => MediaCategory, (category) => category.medias, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: "category_id" })
  category: MediaCategory;
}
