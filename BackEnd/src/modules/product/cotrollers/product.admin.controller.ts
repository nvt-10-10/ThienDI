import { AttachFilesToBodyInterceptor, ImageCompressionInterceptor, VideoCompressionInterceptor } from "@app/core/interceptors";
import { Body, Controller, Get, Post, Put, UploadedFiles, UseFilters, UseInterceptors } from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "../dtos";
import { ProductAdminService } from "../services";
import { FilterQuery, Public, UploadMedia } from "@app/core/decorator";
import { FileCleanupExceptionFilter } from "@app/core/filters";
import { IMAGE_PATH, VIDEO_PATH } from "@app/prototype/enum";
import { MAX_LENGTH_IMAGE_PRODUCT_GALLERY, MAX_LENGTH_IMAGE_PRODUCT_GALLERY_THUMBNAIL } from "@app/prototype/constant";
import { IFilterQuery } from "@app/prototype/interfaces";
import { HttpResponse } from "@app/common/response";
import { Paginate } from "@app/utils";
import { Product } from "@app/entities";
import { CacheInterceptor, CacheKey, CacheTTL } from "@nestjs/cache-manager";

@Controller("/api/admin/products")
@Public()
export class ProductAdminController {
  constructor(private readonly productService: ProductAdminService) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('products_list')
  @CacheTTL(60) // TTL riêng cho API này
  async findByFilter(@FilterQuery({
    sortFields: ['created_at'],
  }) filter: IFilterQuery): Promise<HttpResponse<Paginate<Product>>> {
    const result = await this.productService.findByFilter(filter)
    return HttpResponse.success("Chatted users retrieved successfully", result);
  }

  @UseInterceptors(
    ImageCompressionInterceptor,
    VideoCompressionInterceptor,
    new AttachFilesToBodyInterceptor([
      { name: 'thumbnail', multiple: false },
      { name: 'gallery', multiple: true },
      { name: 'video', multiple: false },
    ]),
  )
  @UploadMedia([
    { name: 'thumbnail', maxCount: MAX_LENGTH_IMAGE_PRODUCT_GALLERY_THUMBNAIL, destination: './public/uploads/images/product' },
    { name: 'gallery', maxCount: MAX_LENGTH_IMAGE_PRODUCT_GALLERY, destination: './public/uploads/images/product' },
    { name: 'video', maxCount: 1, destination: './public/uploads/videos/product' },
  ])
  @UseFilters(FileCleanupExceptionFilter)
  @Post("")
  async store(@UploadedFiles() files: { thumbnail?: Express.Multer.File[]; gallery?: Express.Multer.File[], video?: Express.Multer.File[] },
    @Body() dto: CreateProductDto,): Promise<void> {
    const thumbnail = files.thumbnail?.[0]?.filename ? `${IMAGE_PATH.PRODUCT}/${files.thumbnail?.[0]?.filename}` : null;
    const gallery = files ? files.gallery?.map((f) => `${IMAGE_PATH.PRODUCT}/${f.filename}`) : [];
    const video = files.video?.[0]?.filename
      ? `${VIDEO_PATH.PRODUCT}/${files.video?.[0]?.filename}`
      : null;


    await this.productService.create({ ...dto, thumbnail, gallery, video })
  }

  @UseInterceptors(
    ImageCompressionInterceptor,
    VideoCompressionInterceptor,
    new AttachFilesToBodyInterceptor([
      { name: 'thumbnail', multiple: false },
      { name: 'gallery', multiple: true },
      { name: 'video', multiple: false },
    ]),
  )
  @UploadMedia([
    { name: 'thumbnail', maxCount: MAX_LENGTH_IMAGE_PRODUCT_GALLERY_THUMBNAIL, destination: './public/uploads/images/product' },
    { name: 'gallery', maxCount: MAX_LENGTH_IMAGE_PRODUCT_GALLERY, destination: './public/uploads/images/product' },
    { name: 'video', maxCount: 1, destination: './public/uploads/videos/product' },
  ])
  @UseFilters(FileCleanupExceptionFilter)
  @Put("")
  async update(@UploadedFiles() files: { thumbnail?: Express.Multer.File[]; gallery?: Express.Multer.File[], video?: Express.Multer.File[] },
    @Body() dto: UpdateProductDto,): Promise<void> {
    const thumbnail = files.thumbnail?.[0]?.filename ? `${IMAGE_PATH.PRODUCT}/${files.thumbnail?.[0]?.filename}` : null;
    const gallery = files ? files.gallery?.map((f) => `${IMAGE_PATH.PRODUCT}/${f.filename}`) : [];
    const video = files.video?.[0]?.filename
      ? `${VIDEO_PATH.PRODUCT}/${files.video?.[0]?.filename}`
      : null;
    await this.productService.update({ ...dto, thumbnail, gallery, video })
  }

}