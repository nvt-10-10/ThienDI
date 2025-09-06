import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config';

import envConfig from './config/env.config';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './core/guard';
import { MailModule } from './modules/share/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from './modules/redis/redis.module';
import { EventsModule } from './modules/event/event.module';
import { SocketModule } from './modules/socket/socket/socket.module';
import { MessageModule } from './modules/message/message.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { AccountModule } from './modules/account/account.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './modules/product/product.module';
import { MediaModule } from './modules/media/media.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public/uploads'),
        serveRoot: '/uploads',
        serveStaticOptions: { index: false },
      },
      {
        rootPath: join(__dirname, '..', 'public/uploads/videos'),
        serveRoot: '/videos',
        serveStaticOptions: { index: false },
      },
      {
        rootPath: join(__dirname, '..', 'public/uploads/images'),
        serveRoot: '/images',
        serveStaticOptions: { index: false },
      },
    ),
    CacheModule.registerAsync({
      useFactory: async () => ({
        isGlobal: true,
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          ttl: 60, // TTL mặc định 60 giây
        }),
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [envConfig] }),
    DatabaseConfig,
    RedisModule,
    EventsModule,
    SocketModule,
    MailModule,
    MessageModule,
    AuthModule,
    AccountModule,
    UserModule,
    ConversationModule,
    ProductModule,
    MediaModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],

})
export class AppModule { }
