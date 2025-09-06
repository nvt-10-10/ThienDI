import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = {
          type: configService.get<any>('DATABASE.CONNECT'),
          host: configService.get<string>('DATABASE.HOST'),
          port: configService.get<number>('DATABASE.PORT'),
          username: configService.get<string>('DATABASE.USER'),
          password: configService.get<string>('DATABASE.PASSWORD'),
          database: configService.get<string>('DATABASE.NAME'),
          entities: ['dist/**/**.entity{.ts,.js}'],
          synchronize: true,
          logging: false,
          autoLoadEntities: true,
          keepConnectionAlive: true,
          migrationsRun: false,
          extra: {
            waitForConnections: true, // ✅ Chờ khi pool đầy
            connectionLimit: 20, // ✅ Giới hạn số kết nối đồng thời
            queueLimit: 0 // ✅ Không giới hạn hàng đợi kết nối
          },
          cache: {
            duration: 10000,  // Cache query trong 10s
          },
          migrations: [
            configService.get<string>('ROOT_PATH') +
            '/dist/database/migrations/*{.ts,.js}',
          ],
          migrationsTableName: 'typeorm_migrations',
          cli: {
            migrationsDir: 'src/database/migrations',
          },
          timezone: 'Z'
        };



        return dbConfig;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseConfig { }
