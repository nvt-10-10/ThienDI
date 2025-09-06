import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

type UploadedFile = Express.Multer.File;

interface RequestWithFiles extends Express.Request {
  files?: Record<string, UploadedFile[]>;
  body: Record<string, any>; // đảm bảo body luôn tồn tại
}

export interface FieldConfig {
  name: string;
  multiple?: boolean; // default = false
}

@Injectable()
export class AttachFilesToBodyInterceptor implements NestInterceptor {
  constructor(private readonly fields: FieldConfig[]) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<RequestWithFiles>();

    for (const field of this.fields) {
      const uploadedFiles = req.files?.[field.name];

      if (uploadedFiles && uploadedFiles.length > 0) {
        req.body[field.name] = field.multiple
          ? uploadedFiles.map((file) => file.filename)
          : uploadedFiles[0].filename;
      }
    }

    return next.handle();
  }
}
