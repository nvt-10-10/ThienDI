import { Column, Entity, OneToMany } from "typeorm";
import { BaseAndCodeAndSlug } from "./base-code-and-slug.entity";
import { Media } from "./media.entity";

/**
 * Bảng `media_categories` lưu danh mục của media (ảnh hoặc video)
 * Ví dụ: Ảnh chụp thật, Video review, Ảnh render...
 */
@Entity("media_categories")
export class MediaCategory extends BaseAndCodeAndSlug {

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
    unique: true,
    comment: "Tên danh mục media (ví dụ: Ảnh chụp thật, Video review)",
  })
  name: string;

  @Column({
    name: "is_active",
    type: "boolean",
    default: true,
    comment: "Trạng thái hiển thị sản phẩm (true: đang bán, false: ẩn)"
  })
  is_active: boolean;

  /**
   * Danh sách media thuộc danh mục này
   */
  @OneToMany(() => Media, (media) => media.category)
  medias: Media[];
}
