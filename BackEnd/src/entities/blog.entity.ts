import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { BlogCategory } from './blog-category.entity';
import { BaseAndCodeAndSlug } from './base-code-and-slug.entity';

@Entity({ name: 'blogs' })
export class Blog extends BaseAndCodeAndSlug {
  @Column({
    name: "category_id",
    type: "int",
    nullable: false,
    comment: "Khóa ngoại của danh mục (chỉ lưu ID)"
  })
  category_id: number;

  @Column({
    name: "author_id",
    type: "int",
    nullable: false,
    comment: "Khóa ngoại của người đăng bài (chỉ lưu ID)"
  })
  author_id: number;

  @Column({ type: 'varchar', length: 255, comment: 'Tiêu đề bài viết' })
  title: string;

  @Column({ type: 'text', comment: 'Tóm tắt nội dung bài viết' })
  excerpt: string;

  @Column({ type: 'longtext', comment: 'Nội dung chi tiết bài viết' })
  content: string;

  @Column({
    nullable: true,
    comment: 'Ảnh đại diện bài viết',
  })
  thumbnail?: string;

  @Column({ type: 'date', comment: 'Ngày đăng bài viết' })
  date: Date;

  @Column({
    name: "is_active",
    type: "boolean",
    default: true,
    comment: "Trạng thái hiển thị sản phẩm (true: đang bán, false: ẩn)"
  })
  is_active: boolean;

  @ManyToOne(() => User, (user) => user.blogs, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => BlogCategory, (category) => category.blogs, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: BlogCategory;

}
