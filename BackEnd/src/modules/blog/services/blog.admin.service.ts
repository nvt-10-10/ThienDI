import { BlogCategoryRepository, BlogRepository } from "@app/modules/share/repositories";
import { HttpStatus, Injectable } from "@nestjs/common";
import { DataSource, EntityManager, ILike } from "typeorm";
import { CreateBlogDto, UpdateBlogDto } from "../dtos";
import { generateFindOptions, handleException, Paginate } from "@app/utils";
import { ErrorResponse } from "@app/common/response";
import { HttpExceptionHandler } from "@app/common/error";
import { ERRORS } from "@app/common/message";
import { deleteFiles, validateFilePaths } from "@app/helpers";
import { IFilterQuery } from "@app/prototype/interfaces";
import { Blog } from "@app/entities";

@Injectable()
export class BlogAdminService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly blogRepo: BlogRepository,
    private readonly cateRepo: BlogCategoryRepository
  ) { }

  async findByFilter(filter: IFilterQuery): Promise<Paginate<Blog>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const blogFields = ["id", "title", "url", "thumbnail", "is_active", "type", "created_at"];
        const categoryFields = ["id", "name"];

        const fields = [
          ...blogFields.map(field => `${field}`),
          ...categoryFields.map(field => `category.${field}`)
        ];

        const options = generateFindOptions<Blog>({
          fields,
          filter,
          where: {
            ...(filter.search ? { title: ILike(`%${filter.search.trim()}%`) } : {}),
            category: { is_active: true }
          },
          relations: ["category"]
        })

        return await this.blogRepo.findWithPagination(manager, options);

      })
    } catch (error) {
      handleException(error)
    }
  }

  async create(dto: CreateBlogDto) {
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const category = await this.cateRepo.findById(manager, dto.category_id)
        if (!category) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.CATEGORY.NOT_FOUND.msg_code, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND
          );
        }
        const blog = await this.blogRepo.findOne(manager, {
          where: {
            title: dto.title
          }
        })

        if (blog) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.MEDIA.TITLE_EXISTS.msg_code, HttpStatus.CONFLICT),
            HttpStatus.CONFLICT
          );
        }
        await this.blogRepo.createOne(manager, dto)
      })
    } catch (error) {
      handleException(error)
    }
  }

  async update(dto: UpdateBlogDto) {
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const blog = await this.blogRepo.findById(manager, dto.id)

        if (!blog) {
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

        if (blog.title === dto.title) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.PRODUCT.NAME_EXISTS.msg_code, HttpStatus.CONFLICT),
            HttpStatus.CONFLICT
          );
        }

        if (dto.remove_thumbnail) blog.thumbnail = null

        if (dto.remove_gallery || dto.remove_thumbnail) {
          const filesRemove = [
            ...(dto.remove_gallery ?? []),
          ];
          if (dto.remove_thumbnail) filesRemove.push(dto.remove_thumbnail)
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


        blog.thumbnail = dto.thumbnail
        blog.category = category
        blog.excerpt = dto.excerpt
        blog.content = dto.content
        blog.is_active = dto.is_active
        blog.title = dto.title
        await this.blogRepo.update(manager, dto.id, blog)
      })
    } catch (error) {
      handleException(error)
    }
  }
}