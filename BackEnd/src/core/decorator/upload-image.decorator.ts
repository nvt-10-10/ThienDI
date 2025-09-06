import { applyDecorators, UseInterceptors } from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { diskStorage, Options as MulterOptions } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

function editFileName(
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
): void {
  const name = file.originalname.split('.')[0];
  const extension = extname(file.originalname);
  const timestamp = Date.now();
  const fileName = `${name}-${timestamp}${extension}`;
  callback(null, fileName);
}

function imageFileFilter(
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void {
  const allowed = /(jpg|jpeg|png|webp)$/;
  if (!file.mimetype.match(allowed)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
}

function ensureFolderExists(folder: string) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
}

// ✅ Decorator dùng cho 1 field: 'thumbnail'
export function UploadImage(
  fieldName = 'image',
  folder = './uploads',
): MethodDecorator {
  ensureFolderExists(folder);

  const options: MulterOptions = {
    storage: diskStorage({
      destination: folder,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  };

  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, options)),
  );
}

// ✅ Decorator dùng cho nhiều field: ['thumbnail', 'gallery']
export function UploadImages(
  fields: { name: string; maxCount?: number }[],
  folder = './uploads',
): MethodDecorator {
  ensureFolderExists(folder);

  const options: MulterOptions = {
    storage: diskStorage({
      destination: folder,
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  };

  return applyDecorators(
    UseInterceptors(FileFieldsInterceptor(fields, options)),
  );
}
