import { Media } from "@app/entities";
import { BaseRepository } from "@app/modules/core/repositories";

export class MediaRepository extends BaseRepository<Media> {
  constructor() {
    super(Media)
  }
}