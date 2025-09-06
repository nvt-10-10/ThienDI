import { BlogCategory } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class BlogCategoryRepository extends BaseRepository<BlogCategory> {
  constructor() {
    super(BlogCategory)
  }
}