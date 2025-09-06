
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export abstract class BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;


  @BeforeInsert()
  setCreatedAtUTC() {
    this.created_at = this.created_at ?? new Date();
    this.updated_at = this.updated_at ?? new Date();
  }

  @BeforeUpdate()
  setUpdatedAtUTC() {
    this.updated_at = new Date();
  }
}
