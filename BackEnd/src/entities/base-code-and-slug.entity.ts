import { Column, BeforeInsert, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

export abstract class BaseAndCodeAndSlug extends BaseEntity {
  @Column({
    name: 'slug',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: false,
  })
  slug: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: false,
  })
  @Index()
  code: string;

  @BeforeInsert()
  generateUniqueCodeAndSlug() {
    if (!this.code) {
      this.code = uuidv4();
    }

    if (!this.slug) {
      this.slug = slugify(this.code, { lower: true, strict: true });
    }
  }
}
