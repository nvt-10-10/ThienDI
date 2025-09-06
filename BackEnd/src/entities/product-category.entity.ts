import { Column, Entity, OneToMany } from "typeorm";
import { BaseAndCodeAndSlug } from "./base-code-and-slug.entity";
import { Product } from "./product.entity";

/**
 * Bảng `product_categories` lưu danh mục của sản phẩm
 * Ví dụ: Điện thoại, Laptop, Máy ảnh...
 */
@Entity("product_categories")
export class CategoryProduct extends BaseAndCodeAndSlug {

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
    unique: true,
    comment: "Tên danh mục sản phẩm (ví dụ: Điện thoại, Laptop)",
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
   * Danh sách sản phẩm thuộc danh mục này
   */
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
