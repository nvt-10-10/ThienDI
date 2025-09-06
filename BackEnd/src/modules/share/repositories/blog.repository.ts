import { Blog } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class BlogRepository extends BaseRepository<Blog> {
  constructor() {
    super(Blog)
  }
}