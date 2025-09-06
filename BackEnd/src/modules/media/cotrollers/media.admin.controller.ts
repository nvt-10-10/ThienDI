import { AttachFilesToBodyInterceptor, ImageCompressionInterceptor, VideoCompressionInterceptor } from "@app/core/interceptors";
import { Body, Controller, Get, Post, Put, UploadedFiles, UseFilters, UseInterceptors } from "@nestjs/common";
import { CreateMediaDto, UpdateMediaDto } from "../dtos";
import { MediaAdminService } from "../services";
import { FilterQuery, Public, UploadMedia } from "@app/core/decorator";
import { FileCleanupExceptionFilter } from "@app/core/filters";
import { IMAGE_PATH, MediaType, VIDEO_PATH } from "@app/prototype/enum";
import { MAX_LENGTH_IMAGE_MEDIA, MAX_LENGTH_VIDEO_MEDIA } from "@app/prototype/constant";
import { deleteFiles } from "@app/helpers";
import { IFilterQuery } from "@app/prototype/interfaces";
import { HttpResponse } from "@app/common/response";
import { Paginate } from "@app/utils";
import { Media } from "@app/entities";

@Controller("/api/admin/medias")
@Public()
export class MediaAdminController {
  constructor(private readonly mediaService: MediaAdminService) { }

  @Get()
  async findByFilter(@FilterQuery({
    sortFields: ['created_at'],
  }) filter: IFilterQuery): Promise<HttpResponse<Paginate<Media>>> {
    const result = await this.mediaService.findByFilter(filter)
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
    { name: 'thumbnail', maxCount: MAX_LENGTH_IMAGE_MEDIA, destination: './public/uploads/images/media' },
    { name: 'video', maxCount: MAX_LENGTH_VIDEO_MEDIA, destination: './public/uploads/videos/media' },
  ])
  @UseFilters(FileCleanupExceptionFilter)
  @Post("")
  async store(@UploadedFiles() files: { thumbnail?: Express.Multer.File[]; gallery?: Express.Multer.File[], video?: Express.Multer.File[] },
    @Body() dto: CreateMediaDto,): Promise<void> {
    const thumbnail = files.thumbnail?.[0]?.filename ? `${IMAGE_PATH.MEDIA}/${files.thumbnail?.[0]?.filename}` : null;
    const videoFile = files.video?.[0];
    const video = files.video?.[0]?.filename
      ? `${VIDEO_PATH.MEDIA}/${videoFile?.filename}`
      : null;
    if (dto.type === MediaType.IMAGE && !!videoFile) {
      await deleteFiles([videoFile.path])
    }
    await this.mediaService.create({
      ...dto, ...(dto.type === MediaType.IMAGE
        ? { url: thumbnail }
        : { url: video, thumbnail })
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
    { name: 'thumbnail', maxCount: MAX_LENGTH_IMAGE_MEDIA, destination: './public/uploads/images/media' },
    { name: 'video', maxCount: MAX_LENGTH_VIDEO_MEDIA, destination: './public/uploads/videos/media' },
  ])
  @UseFilters(FileCleanupExceptionFilter)
  @Put("")
  async update(@UploadedFiles() files: { thumbnail?: Express.Multer.File[]; gallery?: Express.Multer.File[], video?: Express.Multer.File[] },
    @Body() dto: UpdateMediaDto,): Promise<void> {
    const thumbnail = files.thumbnail?.[0]?.filename ? `${IMAGE_PATH.MEDIA}/${files.thumbnail?.[0]?.filename}` : null;
    const videoFile = files.video?.[0];
    const video = files.video?.[0]?.filename
      ? `${VIDEO_PATH.MEDIA}/${videoFile?.filename}`
      : null;
    if (dto.type === MediaType.IMAGE && !!videoFile) {
      await deleteFiles([videoFile.path])
    }
    await this.mediaService.update({
      ...dto, video, ...(dto.type === MediaType.IMAGE
        ? { url: thumbnail }
        : { url: video, thumbnail })
    })
  }

}