import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageCompressionInterceptor implements NestInterceptor {
  private async compressToWebp(filePath: string): Promise<string> {
    const ext = path.extname(filePath);
    const outputPath = filePath.replace(ext, '.webp');

    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    // Xoá file gốc
    fs.unlinkSync(filePath);

    return outputPath;
  }

  private async handleFiles(files: Express.Multer.File[]): Promise<void> {
    for (const file of files) {
      // 👉 Kiểm tra mimetype chỉ nén ảnh
      if (file.mimetype.startsWith('image/')) {
        try {
          const compressedPath = await this.compressToWebp(file.path);

          // Cập nhật lại file.path, file.filename để controller lấy đúng
          file.path = compressedPath;
          file.filename = path.basename(compressedPath);
        } catch (err) {
          console.error(`❌ Lỗi nén ảnh (${file.originalname}):`, err.message);
        }
      } else {
        // Bỏ qua nếu không phải ảnh
        console.warn(`⚠️ Bỏ qua file không phải ảnh: ${file.originalname}`);
      }
    }
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const files = request.files;

    if (files) {
      const allFiles: Express.Multer.File[] = Array.isArray(files)
        ? files
        : Object.values(files).flat();

      await this.handleFiles(allFiles);
    }

    return next.handle();
  }
}
