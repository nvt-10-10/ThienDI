import { AttachFilesToBodyInterceptor, ImageCompressionInterceptor, VideoCompressionInterceptor } from "@app/core/interceptors";
import { Body, Controller, Get, Post, Put, UploadedFiles, UseFilters, UseInterceptors } from "@nestjs/common";
import { CreateBlogDto, UpdateBlogDto } from "../dtos";
import { BlogAdminService } from "../services";
import { FilterQuery, Public, UploadMedia } from "@app/core/decorator";
import { FileCleanupExceptionFilter } from "@app/core/filters";
import { IMAGE_PATH } from "@app/prototype/enum";
import { MAX_LENGTH_IMAGE_MEDIA, MAX_LENGTH_VIDEO_MEDIA } from "@app/prototype/constant";
import { IFilterQuery } from "@app/prototype/interfaces";
import { HttpResponse } from "@app/common/response";
import { Paginate } from "@app/utils";
import { Blog } from "@app/entities";

@Controller("/api/admin/blogs")
@Public()
export class BlogAdminController {
  constructor(private readonly blogService: BlogAdminService) { }

  @Get()
  async findByFilter(@FilterQuery({
    sortFields: ['created_at'],
  }) filter: IFilterQuery): Promise<HttpResponse<Paginate<Blog>>> {
    const result = await this.blogService.findByFilter(filter)
    return HttpResponse.success("Chatted users retrieved successfully", result);
  }

  @UseInterceptors(
    ImageCompressionInterceptor,
    VideoCompressionInterceptor,
    new AttachFilesToBodyInterceptor([
      { name: 'thumbnail', multiple: false },
      { name: 'video', multiple: false },
    ]),
  )
  @UploadMedia([
    { name: 'thumbnail', maxCount: MAX_LENGTH_IMAGE_MEDIA, destination: './public/uploads/images/blog' },
    { name: 'video', maxCount: MAX_LENGTH_VIDEO_MEDIA, destination: './public/uploads/videos/blog' },
  ])
  @UseFilters(FileCleanupExceptionFilter)
  @Post("")
  async store(@UploadedFiles() files: { thumbnail?: Express.Multer.File[]; gallery?: Express.Multer.File[], video?: Express.Multer.File[] },
    @Body() dto: CreateBlogDto,): Promise<void> {
    const thumbnail = files.thumbnail?.[0]?.filename ? `${IMAGE_PATH.MEDIA}/${files.thumbnail?.[0]?.filename}` : null;


    await this.blogService.create({
      ...dto, thumbnail
    })
  }

  @UseInterceptors(
    ImageCompressionInterceptor,
    VideoCompressionInterceptor,
    new AttachFilesToBodyInterceptor([
      { name: 'thumbnail', multiple: false },
      { name: 'video', multiple: false },
    ]),
  )
  @UploadMedia([
    { name: 'thumbnail', maxCount: MAX_LENGTH_IMAGE_MEDIA, destination: './public/uploads/images/blog' },
    { name: 'video', maxCount: MAX_LENGTH_VIDEO_MEDIA, destination: './public/uploads/videos/blog' },
  ])
  @UseFilters(FileCleanupExceptionFilter)
  @Put("")
  async update(@UploadedFiles() files: { thumbnail?: Express.Multer.File[]; gallery?: Express.Multer.File[], video?: Express.Multer.File[] },
    @Body() dto: UpdateBlogDto,): Promise<void> {
    const thumbnail = files.thumbnail?.[0]?.filename ? `${IMAGE_PATH.MEDIA}/${files.thumbnail?.[0]?.filename}` : null;
    await this.blogService.update({
      ...dto, thumbnail
    })
  }

}