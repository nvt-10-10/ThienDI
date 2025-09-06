import { CategoryProduct } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class CategoryProductRepository extends BaseRepository<CategoryProduct> {
  constructor() {
    super(CategoryProduct)
  }
}