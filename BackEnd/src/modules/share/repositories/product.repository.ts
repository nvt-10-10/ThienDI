import { Product } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product)
  }
}