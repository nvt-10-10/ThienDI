import { RedisService } from "@app/modules/redis/redis.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories";
import { DataSource, EntityManager } from "typeorm";
import { FindOptions } from "@app/prototype/types";
import { User } from "@app/entities";
import { HttpExceptionHandler } from "@app/common/error";
import { ERRORS } from "@app/common/message";
import { ErrorResponse } from "@app/common/response";
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { handleException } from "@app/utils";
import { RedisKey } from "@app/prototype/enum";
import { Verify2FADto } from "../dtos";

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly redisServer: RedisService,
    private readonly userRepository: UserRepository,
  ) { }

  async generateSecretWithQRCode(manage: EntityManager, user_id: number): Promise<any> {
    try {
      const optionsUser: FindOptions<User> = {
        where: { id: user_id },
        fields: ['id', 'email', 'two_fa_secret'],
      }
      const user = await this.userRepository.findOne(manage, optionsUser)

      if (user.two_fa_secret) {
        throw new HttpExceptionHandler(
          ErrorResponse.create(ERRORS.TWO_FA.TWO_FA_ENABLED.msg_code, HttpStatus.BAD_REQUEST),
          HttpStatus.BAD_REQUEST
        );
      }
      const secret = speakeasy.generateSecret({
        name: `Tosi Growth Holding (${user.email})`,
        length: 16
      });
      const url: string = secret.otpauth_url || ''
      const qrCode = await this.generateQRCode(url);

      return { qrCode, secret: secret.base32, };
    } catch (error) {
      ;
      handleException(error)
    }
  }

  async generateQRCode(otpauthUrl: string): Promise<string> {
    return await qrcode.toDataURL(otpauthUrl) as string;
  }

  async verify2Fa(payload: Verify2FADto): Promise<boolean> {
    try {
      const code = await this.redisServer.get(`${RedisKey.CONFIRM_TWO_FA}`);
      if (code && code === payload.token) {
        throw new HttpExceptionHandler(
          ErrorResponse.create(ERRORS.TWO_FACTOR_AUTH.CODE_ALREADY_USED.msg_code, HttpStatus.BAD_REQUEST),
          HttpStatus.BAD_REQUEST
        );
      }
      const isValid = speakeasy.totp.verify({
        secret: payload.secret,
        encoding: 'base32',
        token: payload.token,
        time: payload.timestamp || Math.floor(Date.now() / 1000),
        window: 1,
      });
      if (!isValid) {
        throw new HttpExceptionHandler(
          ErrorResponse.create(ERRORS.TWO_FACTOR_AUTH.INVALID_CODE.msg_code, HttpStatus.BAD_REQUEST),
          HttpStatus.BAD_REQUEST
        );
      }
      await this.redisServer.set(`${RedisKey.CONFIRM_TWO_FA}`, payload.token, 120);
      return true
    } catch (error) {
      handleException(error)
    }
  }

}