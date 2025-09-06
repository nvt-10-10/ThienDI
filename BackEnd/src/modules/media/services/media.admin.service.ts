import { MediaCategoryRepository, MediaRepository } from "@app/modules/share/repositories";
import { HttpStatus, Injectable } from "@nestjs/common";
import { DataSource, EntityManager, ILike } from "typeorm";
import { CreateMediaDto, UpdateMediaDto } from "../dtos";
import { generateFindOptions, handleException, Paginate } from "@app/utils";
import { ErrorResponse } from "@app/common/response";
import { HttpExceptionHandler } from "@app/common/error";
import { ERRORS } from "@app/common/message";
import { deleteFiles, validateFilePaths } from "@app/helpers";
import { IFilterQuery } from "@app/prototype/interfaces";
import { Media } from "@app/entities";

@Injectable()
export class MediaAdminService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mediaRepo: MediaRepository,
    private readonly cateRepo: MediaCategoryRepository
  ) { }

  async findByFilter(filter: IFilterQuery): Promise<Paginate<Media>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const mediaFields = ["id", "title", "url", "thumbnail", "is_active", "type", "created_at"];
        const categoryFields = ["id", "name"];

        const fields = [
          ...mediaFields.map(field => `${field}`),
          ...categoryFields.map(field => `category.${field}`)
        ];

        const options = generateFindOptions<Media>({
          fields,
          filter,
          where: {
            ...(filter.search ? { title: ILike(`%${filter.search.trim()}%`) } : {}),
            category: { is_active: true }
          },
          relations: ["category"]
        })

        return await this.mediaRepo.findWithPagination(manager, options);

      })
    } catch (error) {
      handleException(error)
    }
  }

  async create(dto: CreateMediaDto) {
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const category = await this.cateRepo.findById(manager, dto.category_id)
        if (!category) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.CATEGORY.NOT_FOUND.msg_code, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND
          );
        }
        const media = await this.mediaRepo.findOne(manager, {
          where: {
            title: dto.title
          }
        })

        if (media) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.MEDIA.TITLE_EXISTS.msg_code, HttpStatus.CONFLICT),
            HttpStatus.CONFLICT
          );
        }
        await this.mediaRepo.createOne(manager, dto)
      })
    } catch (error) {
      handleException(error)
    }
  }

  async update(dto: UpdateMediaDto) {
    try {
      await this.dataSource.transaction(async (manager: EntityManager) => {
        const media = await this.mediaRepo.findById(manager, dto.id)

        if (!media) {
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

        if (media.title === dto.title) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.PRODUCT.NAME_EXISTS.msg_code, HttpStatus.CONFLICT),
            HttpStatus.CONFLICT
          );
        }

        if (dto.remove_thumbnail) media.thumbnail = null

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


        media.thumbnail = dto.thumbnail
        media.category = category
        media.description = dto.description
        media.is_active = dto.is_active
        media.title = dto.title
        media.type = dto.type
        media.url = dto.url
        await this.mediaRepo.update(manager, dto.id, media)
      })
    } catch (error) {
      handleException(error)
    }
  }
}