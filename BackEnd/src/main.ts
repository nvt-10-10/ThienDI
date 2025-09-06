import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TokenService } from './modules/auth/services';
import { AuthenticatedSocketIoAdapter } from './modules/socket/socket/adapter';
import { AllExceptionsFilter } from './modules/exceptions';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { CustomValidationPipe } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(CustomValidationPipe);
  const tokenService = app.get(TokenService);
  const adapter = new AuthenticatedSocketIoAdapter(app, tokenService);

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.useWebSocketAdapter(adapter);

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Tài liệu API tự động')
    .setVersion('1.0')
    .build();

  app.enableCors({
    origin: 'http://localhost:3000',  // chỉ cho phép frontend cụ thể
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3006);
}
bootstrap();
