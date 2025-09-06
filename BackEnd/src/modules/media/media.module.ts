import { Module } from "@nestjs/common";
import { MediaCategoryRepository, MediaRepository } from "../share/repositories";
import { MediaAdminService } from "./services/media.admin.service";
import { MediaAdminController } from "./cotrollers";
import { CacheConfigModule } from "@app/core/cache";

@Module({
  imports: [CacheConfigModule],
  providers: [MediaAdminService, MediaRepository, MediaCategoryRepository],
  controllers: [MediaAdminController],
  exports: [MediaAdminService]
})
export class MediaModule { }