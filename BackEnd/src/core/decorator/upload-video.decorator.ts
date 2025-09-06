import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

interface UploadVideoOptions {
  fieldName: string;
  maxCount?: number;
  destination?: string;
}

export function UploadVideo(options: UploadVideoOptions) {
  const {
    fieldName,
    maxCount = 1,
    destination = './public/uploads/videos',
  } = options;

  // Tạo thư mục nếu chưa có
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  return applyDecorators(
    UseInterceptors(
      FilesInterceptor(fieldName, maxCount, {
        storage: diskStorage({
          destination,
          filename: (_req, file, cb) => {
            const uniqueSuffix = uuidv4();
            const ext = extname(file.originalname);
            cb(null, `${fieldName}-${uniqueSuffix}${ext}`);
          },
        }),
        fileFilter: (_req, file, cb) => {
          // Chỉ cho phép file video
          if (!file.mimetype.startsWith('video/')) {
            return cb(new Error('Only video files are allowed!'), false);
          }
          cb(null, true);
        },
        limits: {
          fileSize: 100 * 1024 * 1024, // Giới hạn 100MB, bạn có thể thay đổi
        },
      }),
    ),
  );
}
