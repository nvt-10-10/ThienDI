import { Injectable, OnModuleDestroy, OnModuleInit, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClient;
  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly configService: ConfigService) { }

  onModuleInit() {
    const host = this.configService.get<string>('REDIS.HOST');
    const port = this.configService.get<number>('REDIS.PORT')
    const password = this.configService.get<string>('REDIS.PASSWORD');
    const db = parseInt(this.configService.get<string>('REDIS.DB', '0'), 10);

    this.client = new Redis({
      host,
      port,
      password,
      db,
    });

    this.client.on('connect', () => this.logger.log('[Redis] Connected'));
    this.client.on('error', (err) => this.logger.error('[Redis] Error:', err));
  }

  // Ngắt kết nối khi app shutdown
  onModuleDestroy() {
    return this.client.quit();
  }

  // ✅ Validate key
  private validateKey(key: string) {
    if (!key || typeof key !== 'string' || key.trim() === '') {
      throw new BadRequestException('Redis key must be a non-empty string');
    }

    if (!/^[a-zA-Z0-9:_-]+$/.test(key)) {
      throw new BadRequestException(`Invalid characters in key: "${key}"`);
    }
  }


  // ✅ Validate value
  private validateValue(value: any) {
    if (value === undefined || value === null) {
      throw new BadRequestException('Redis value cannot be undefined or null');
    }
  }

  // ✅ GET
  async get(key: string): Promise<string | null> {
    this.validateKey(key);
    return this.client.get(key);
  }

  // ✅ SET
  async set(key: string, value: string, expireInSeconds?: number): Promise<'OK'> {
    this.validateKey(key);
    this.validateValue(value);

    if (expireInSeconds) {
      return this.client.set(key, value, 'EX', expireInSeconds);
    }

    return this.client.set(key, value);
  }

  // ✅ DEL
  async del(key: string): Promise<number> {
    this.validateKey(key);
    return this.client.del(key);
  }

  // ✅ TTL
  async ttl(key: string): Promise<number> {
    this.validateKey(key);
    return this.client.ttl(key);
  }

  // ✅ EXISTS
  async exists(key: string): Promise<boolean> {
    this.validateKey(key);
    return (await this.client.exists(key)) === 1;
  }

  // ✅ GET JSON
  async getJSON<T = any>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    try {
      return raw ? (JSON.parse(raw) as T) : null;
    } catch (err) {
      console.warn(`[Redis] Failed to parse JSON for key "${key}":`, err);
      return null;
    }
  }
  // ✅ SET JSON
  async setJSON(key: string, value: any, expireInSeconds?: number) {
    this.validateKey(key);
    this.validateValue(value);
    return this.set(key, JSON.stringify(value), expireInSeconds);
  }

  // ✅ COMPARE VALUE
  async compareValue(key: string, expectedValue: string): Promise<boolean> {
    this.validateKey(key);
    this.validateValue(expectedValue);

    const currentValue = await this.get(key);
    return currentValue === expectedValue;
  }

  // ✅ COMPARE JSON
  async compareJSON<T = any>(key: string, expected: T): Promise<boolean> {
    this.validateKey(key);
    this.validateValue(expected);

    const current = await this.getJSON<T>(key);
    return JSON.stringify(current) === JSON.stringify(expected);
  }

  // ✅ Expose raw client (nếu cần dùng pub/sub hoặc transaction)
  getClient(): RedisClient {
    return this.client;
  }
}
