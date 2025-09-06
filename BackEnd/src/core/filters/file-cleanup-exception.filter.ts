import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as fs from 'fs';

@Catch()
@Injectable()
export class FileCleanupExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Dọn file nếu có files upload
    try {
      const rawFiles = request?.files;

      let allFiles: Express.Multer.File[] = [];

      if (Array.isArray(rawFiles)) {
        allFiles = rawFiles;
      } else if (rawFiles && typeof rawFiles === 'object') {
        allFiles = Object.values(rawFiles).flat();
      }

      allFiles.forEach((file) => {
        if (file?.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    } catch (cleanupError) {
      console.error('⚠️ Lỗi khi xóa file upload:', cleanupError);
      // Không throw lỗi cleanup, vì không muốn override lỗi chính
    }

    // Trả lỗi như bình thường
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      return response.status(status).json(res);
    }

    // Lỗi không xác định
    console.error('🔥 Lỗi không xác định:', exception);
    return response.status(500).json({
      message: 'Internal server error',
    });
  }
}
