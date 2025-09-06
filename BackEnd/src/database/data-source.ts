import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: process.env.DATABASE_CONNECT as any || 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3307'),
  username: process.env.DATABASE_USER || 'tosi',
  password: process.env.DATABASE_PASSWORD || 'Admin1234@',
  database: process.env.DATABASE_NAME || 'tosi',
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/entities/**/*.js"]
      : [join(process.cwd(), "./src/entities/**/*.ts")],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/database/migrations/**/*.js"]
      : [join(process.cwd(), "./src/database/migrations/**/*.ts")],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
