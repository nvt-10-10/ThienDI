import { Column, Entity, OneToMany } from "typeorm";
import { RoleEnum, UserStatusEnum } from "@app/prototype/enum";
import { BaseAndCodeAndSlug } from "./base-code-and-slug.entity";
import { ConversationParticipant } from "./conversation-participants.entity";
import { Blog } from "./blog.entity";

@Entity("users")
export class User extends BaseAndCodeAndSlug {
  @Column({ name: "email", type: "varchar", length: 100, unique: true, nullable: false, comment: "Địa chỉ email người dùng – dùng để đăng nhập và xác minh tài khoản", })
  email: string

  @Column({ name: "name", type: "varchar", length: 100, unique: false, nullable: true, comment: "Teen người dùng – dùng để đăng nhập và xác minh tài khoản", })
  name: string

  @Column({ name: "username", type: "varchar", length: 100, unique: true, nullable: false, comment: "Tên định danh người dùng – duy nhất trong hệ thống, có thể login", })
  username: string

  @Column({ name: "password", type: "varchar", length: 255, nullable: false, comment: "Mật khẩu đã mã hóa (hash)", })
  password: string

  @Column({ name: "avatar", type: "varchar", length: 255, nullable: true, comment: "Avatar người dùng", })
  avatar?: string

  @Column({ name: "role", type: "enum", enum: RoleEnum, default: RoleEnum.USER, nullable: false, comment: "Vai trò người dùng – phân quyền trong hệ thống (user, admin, ...)", })
  role: RoleEnum

  @Column({ name: "status", type: "enum", enum: UserStatusEnum, default: UserStatusEnum.PENDING, nullable: false, comment: "Trạng thái tài khoản (pending, active, paused, banned, ...)", })
  status: UserStatusEnum

  @Column({ name: "two_fa_secret", type: "varchar", length: 255, nullable: true, comment: "Mã khóa 2FA (Two-Factor Authentication) của người dùng", })
  two_fa_secret?: string

  @OneToMany(() => ConversationParticipant, (cp) => cp.user)
  conversations: ConversationParticipant[];

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
