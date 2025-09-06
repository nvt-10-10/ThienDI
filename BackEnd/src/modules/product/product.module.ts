import { Module } from "@nestjs/common";
import { ProductAdminService } from "./services";
import { ProductAdminController } from "./cotrollers";
import { CategoryProductRepository, ProductRepository } from "../share/repositories";
import { CacheConfigModule } from "@app/core/cache";

@Module({
  imports: [CacheConfigModule],
  providers: [ProductAdminService, ProductRepository, CategoryProductRepository],
  controllers: [ProductAdminController],
  exports: []
})
export class ProductModule { }