// video-compression.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as fs from 'fs';
import * as path from 'path';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@Injectable()
export class VideoCompressionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const files: Express.Multer.File[] = request.files?.video || [];

    if (Array.isArray(files) && files.length > 0) {
      for (const file of files) {
        const inputPath = file.path;
        const outputPath = path.join(
          path.dirname(inputPath),
          `compressed-${file.filename}`,
        );

        ffmpeg(inputPath)
          .videoCodec('libx264') // chuẩn nén phổ biến
          .audioCodec('aac')
          .outputOptions(['-vcodec libx264',
            '-crf 23',
            '-preset fast',
            '-movflags +faststart'
          ]) // 23 = chất lượng cao, 28 = nén tốt (thấp hơn = chất lượng cao hơn)
          .on('end', () => {
            console.log(`Video compressed: ${outputPath}`);
            // Xóa file gốc nếu muốn
            fs.unlinkSync(inputPath);
            // Thay file trong request để controller dùng file nén
            file.filename = path.basename(outputPath);
            file.path = outputPath;
          })
          .on('error', (err) => {
            console.error('Compression error:', err);
          })
          .save(outputPath);
      }
    }

    return next.handle();
  }
}
