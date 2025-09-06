import { HttpExceptionHandler } from "@app/common/error";
import { ERRORS } from "@app/common/message";
import { ErrorResponse } from "@app/common/response";
import { IJwtPayload } from "@app/prototype/interfaces";
import { handleException } from "@app/utils";
import { HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenResponse } from "../responses";

@Injectable()
export class TokenService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async generateAuthToken(payload: IJwtPayload): Promise<string> {
    try {
      return await this.JwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT.SECRET'),
        expiresIn: this.configService.get<string>('JWT.EXPIRE'),
      });
    } catch (error) {
      handleException(error)
    }
  }

  async generateRefreshToken(payload: IJwtPayload): Promise<string> {
    try {
      return await this.JwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT.REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT.REFRESH_EXPIRE'),
      });
    } catch (error) {
      handleException(error)
    }
  }

  async verifyToken(token: string, type: string = 'token'): Promise<IJwtPayload & { exp: number }> {
    try {
      const SECRET =
        type == 'token'
          ? this.configService.get<string>('JWT.SECRET')
          : this.configService.get<string>('JWT.REFRESH_SECRET');

      const decoded = await this.JwtService.verifyAsync(token, {
        secret: SECRET,
      });

      if (!decoded)
        throw new HttpExceptionHandler(
          ErrorResponse.create(ERRORS.AUTH.TOKEN_INVALID.msg_code, HttpStatus.UNAUTHORIZED),
          HttpStatus.UNAUTHORIZED
        );
      return decoded as (IJwtPayload & { exp: number });
    } catch (error: unknown) {
      handleException(error)
    }
  }

  async verifyRefresh(token: string, type: string = 'token'): Promise<IJwtPayload & { exp: number }> {
    try {
      const SECRET =
        type == 'token'
          ? this.configService.get<string>('JWT.SECRET')
          : this.configService.get<string>('JWT.REFRESH_SECRET');

      const decoded = await this.JwtService.verifyAsync(token, {
        secret: SECRET,
      });

      if (!decoded)
        throw new HttpExceptionHandler(
          ErrorResponse.create(ERRORS.AUTH.TOKEN_INVALID.msg_code, HttpStatus.UNAUTHORIZED),
          HttpStatus.UNAUTHORIZED
        );
      return decoded as (IJwtPayload & { exp: number });
    } catch (error: unknown) {
      handleException(error)
    }
  }

  async refreshToken(access_token: string, refresh_token: string): Promise<RefreshTokenResponse> {
    try {
      if (!refresh_token) {
        return {
          access_token: null,
          refresh_token: null,
        }
      }

      const [verify_access_token, verify_refresh_token] = await Promise.all([
        this.verifyRefresh(access_token, "token"),
        this.verifyRefresh(refresh_token, 'refresh-token'),
      ])
      if (verify_access_token && verify_refresh_token) {
        return { access_token, refresh_token }
      }
      if (!verify_refresh_token) {
        return {
          access_token: null,
          refresh_token: null,
        }
      }
      delete verify_refresh_token.exp
      const new_access_token = await this.generateAuthToken(verify_refresh_token);
      // const refresh_token = await this.generateRefreshToken(verifyToken);
      return {
        access_token: new_access_token,
        refresh_token
      }
    } catch (error) {
      handleException(error)
    }
  }
}