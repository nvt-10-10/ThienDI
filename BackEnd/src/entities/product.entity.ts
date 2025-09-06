import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseAndCodeAndSlug } from "./base-code-and-slug.entity";
import { CategoryProduct } from "./product-category.entity";

@Entity("products")
export class Product extends BaseAndCodeAndSlug {
  @Column({
    name: "category_id",
    type: "int",
    nullable: false,
    comment: "Khóa ngoại của danh mục (chỉ lưu ID)"
  })
  category_id: number;

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
    unique: true,
    comment: "Tên sản phẩm (duy nhất, dùng để phân biệt)"
  })
  name: string;

  @Column({
    name: "title",
    type: "varchar",
    nullable: true,
    comment: "Tiêu đề sản phẩm (hiển thị ngoài giao diện)"
  })
  title: string;

  @Column({
    name: "description",
    type: "text",
    nullable: true,
    comment: "Mô tả ngắn cho sản phẩm"
  })
  description: string;

  @Column({
    name: "long_description",
    type: "text",
    nullable: true,
    comment: "Mô tả chi tiết sản phẩm"
  })
  long_description: string;

  @Column({
    name: "price_min",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    comment: "Giá thấp nhất (cho các sản phẩm có khoảng giá)"
  })
  price_min: number;

  @Column({
    name: "price_max",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    comment: "Giá cao nhất (cho các sản phẩm có khoảng giá)"
  })
  price_max: number;

  @Column({
    name: "slug",
    type: "varchar",
    nullable: true,
    unique: true,
    comment: "Slug dùng cho URL thân thiện (không dấu, không trùng)"
  })
  slug: string;

  @Column({
    name: "features",
    type: "json",
    nullable: true,
    comment: "Danh sách các đặc điểm nổi bật (hiển thị dưới dạng bullet)"
  })
  features: string[];

  @Column({
    name: "customization",
    type: "json",
    nullable: true,
    comment: "Tùy chọn cá nhân hóa của sản phẩm (kích thước, màu sắc...)"
  })
  customization: string[];

  @Column({
    name: "thumbnail",
    type: "varchar",
    nullable: true,
    comment: "Ảnh đại diện của sản phẩm"
  })
  thumbnail: string;

  @Column({
    name: "video",
    type: "varchar",
    nullable: true,
    comment: "Video sản phẩm"
  })
  video: string;

  @Column({
    name: 'gallery',
    type: 'json',
    nullable: true,
    comment: 'Danh sách ảnh phụ (tối đa 6 ảnh)',
  })
  gallery: string[];

  @Column({
    name: "is_active",
    type: "boolean",
    default: true,
    comment: "Trạng thái hiển thị sản phẩm (true: đang bán, false: ẩn)"
  })
  is_active: boolean;

  @ManyToOne(() => CategoryProduct, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: CategoryProduct
}
