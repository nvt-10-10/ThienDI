// upload-media.decorator.ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

interface UploadField {
  name: string;
  maxCount: number;
  destination: string;
}

export function UploadMedia(fields: UploadField[]) {
  const fieldConfigs = fields.map(({ name, maxCount }) => ({ name, maxCount }));

  // Đảm bảo các thư mục tồn tại
  fields.forEach(({ destination }) => {
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }
  });

  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(fieldConfigs, {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const field = fields.find(f => f.name === file.fieldname);
            cb(null, field?.destination || './uploads/unknown');
          },
          filename: (_req, file, cb) => {
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uuidv4()}${ext}`;
            cb(null, filename);
          },
        }),
        fileFilter: (_req, file, cb) => {
          if (file.fieldname === 'video' && !file.mimetype.startsWith('video/')) {
            return cb(new Error('Only video files are allowed!'), false);
          }
          if ((file.fieldname === 'thumbnail' || file.fieldname === 'gallery') && !file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
          }
          cb(null, true);
        },
        limits: {
          fileSize: 100 * 1024 * 1024, // 100MB max/file
        },
      }),
    ),
  );
}
