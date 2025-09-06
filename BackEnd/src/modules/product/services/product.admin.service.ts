import { CategoryProductRepository, ProductRepository } from "@app/modules/share/repositories";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { DataSource, EntityManager, ILike } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "../dtos";
import { generateFindOptions, handleException, Paginate } from "@app/utils";
import { ErrorResponse } from "@app/common/response";
import { HttpExceptionHandler } from "@app/common/error";
import { ERRORS } from "@app/common/message";
import { deleteFiles, validateFilePaths } from "@app/helpers";
import { IFilterQuery } from "@app/prototype/interfaces";
import { Product } from "@app/entities";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class ProductAdminService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly prodRepo: ProductRepository,
    private readonly cateRepo: CategoryProductRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async findByFilter(filter: IFilterQuery): Promise<Paginate<Product>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const productFields = ["id", "name", "title", "thumbnail", "is_active", "created_at"];
        const categoryFields = ["id", "name"];

        const fields = [
          ...productFields.map(field => `${field}`),
          ...categoryFields.map(field => `category.${field}`)
        ];

        const options = generateFindOptions<Product>({
          fields,
          filter,
          where: filter.search
            ? [
              { name: ILike(`%${filter.search.trim()}%`), category: { is_active: true } },
              { title: ILike(`%${filter.search.trim()}%`), category: { is_active: true } }
            ]
            : { category: { is_active: true } },
          relations: ["category"]
        })

        return await this.prodRepo.findWithPagination(manager, options);

      })
    } catch (error) {
      handleException(error)
    }
  }


  async create(dto: CreateProductDto) {
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const category = await this.cateRepo.findById(manager, dto.category_id)
        if (!category) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.CATEGORY.NOT_FOUND.msg_code, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND
          );
        }
        const product = await this.prodRepo.findOne(manager, {
          where: {
            name: dto.name
          }
        })

        if (product) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.PRODUCT.NAME_EXISTS.msg_code, HttpStatus.CONFLICT),
            HttpStatus.CONFLICT
          );
        }
        await this.prodRepo.createOne(manager, dto)
      })
    } catch (error) {
      handleException(error)
    }
  }

  async update(dto: UpdateProductDto) {
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const product = await this.prodRepo.findById(manager, dto.id)

        if (!product) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.PRODUCT.NOT_FOUND.msg_code, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND
          );
        }

        const category = await this.cateRepo.findById(manager, dto.category_id)

        if (!category) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.CATEGORY.NOT_FOUND.msg_code, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND
          );
        }

        if (product.name === dto.name) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.PRODUCT.NAME_EXISTS.msg_code, HttpStatus.CONFLICT),
            HttpStatus.CONFLICT
          );
        }

        if (dto.remove_gallery && dto.remove_gallery.length > 0) {
          for (const path of dto.remove_gallery) {
            const index = product.gallery.findIndex(item => item === path)
            if (index !== -1) {
              product.gallery.splice(index, 1);
            }
          }
        }

        if (dto.remove_gallery || dto.remove_thumbnail) {
          const filesRemove = [
            ...(dto.remove_gallery ?? []),
          ];
          if (dto.remove_thumbnail) filesRemove.push(dto.remove_thumbnail)
          if (dto.remove_video) filesRemove.push(dto.remove_video)
          const newPath = filesRemove.map(item => `public/uploads${item}`)

          const check = await validateFilePaths(newPath)
          if (!check) {
            throw new HttpExceptionHandler(
              ErrorResponse.create(ERRORS.PRODUCT.INVALID_IMAGE_PATH.msg_code, HttpStatus.BAD_REQUEST),
              HttpStatus.BAD_REQUEST
            );
          }
          await deleteFiles(newPath)
        }


        product.video = dto.video
        product.thumbnail = dto.thumbnail
        product.gallery.push(...dto.gallery)
        product.name = dto.name
        product.title = dto.title
        product.description = dto.description
        product.long_description = dto.long_description
        product.features = dto.features
        product.is_active = dto.is_active
        product.price_max = dto.price_max
        product.price_min = dto.price_min
        product.customization = dto.customization
        product.slug = dto.slug
        product.category_id = dto.category_id
        await this.prodRepo.update(manager, dto.id, product)
      })
    } catch (error) {
      handleException(error)
    }
  }
}