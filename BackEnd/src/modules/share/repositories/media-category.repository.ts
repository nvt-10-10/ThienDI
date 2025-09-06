import { MediaCategory } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class MediaCategoryRepository extends BaseRepository<MediaCategory> {
  constructor() {
    super(MediaCategory)
  }
}