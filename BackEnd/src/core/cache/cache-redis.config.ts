// cache-config.module.ts
import { CacheModule } from '@nestjs/cache-manager';
import { Module, } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore.redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
          ttl: 60, // thời gian sống cache (giây)
        }),
      }),
    }),
  ],
  exports: [CacheModule], // 👈 export ra để module khác dùng
})
export class CacheConfigModule { }
