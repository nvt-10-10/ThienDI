import { Module } from "@nestjs/common";
import { BlogCategoryRepository, BlogRepository } from "../share/repositories";
import { BlogAdminService } from "./services/blog.admin.service";
import { BlogAdminController } from "./cotrollers";
import { CacheConfigModule } from "@app/core/cache";

@Module({
  imports: [CacheConfigModule],
  providers: [BlogAdminService, BlogRepository, BlogCategoryRepository],
  controllers: [BlogAdminController],
  exports: [BlogAdminService]
})
export class BlogModule { }