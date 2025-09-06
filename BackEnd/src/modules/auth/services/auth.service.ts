import { UserRepository } from "@app/modules/share/repositories";
import { HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto } from "../dtos";
import { generateJwtPayLoad, handleException } from "@app/utils";
import { DataSource } from "typeorm";
import { FindOptions } from "@app/prototype/types";
import { User } from "@app/entities";
import { HttpExceptionHandler } from "@app/common/error";
import { ErrorResponse } from "@app/common/response";
import { ERRORS } from "@app/common/message";
import * as bcrypt from 'bcrypt';
import { LoginResponse, RegisterResponse } from "../responses";
import { TokenService } from "./token.service";
import { IAuthService } from "../interfaces";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly dataSource: DataSource,
    private readonly tokenService: TokenService
  ) {
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const options: FindOptions<User> = {
          where: {
            email: dto.email,
          },
          fields: ["id", "email", "role", "password", "username"]
        };
        const user = await this.userRepo.findOne(manager, options)
        if (!user) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.AUTH.USER_NOT_FOUND.msg_code, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND
          );
        }

        const match = bcrypt.compareSync(dto.password, user?.password);
        if (!match) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.AUTH.INVALID_PASSWORD.msg_code, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND
          );
        }
        delete user.password
        const jwtPayload = generateJwtPayLoad(user)
        const accessToken = await this.tokenService.generateAuthToken(jwtPayload)
        return { user, access_token: accessToken }
      })
    } catch (error) {
      handleException(error)
    }
  }

  async register(dto: RegisterDto): Promise<RegisterResponse> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const options: FindOptions<User> = {
          where: {
            email: dto.email,
          },
          fields: ["id", "email", "role", "password"]
        };
        const user = await this.userRepo.findOne(manager, options)
        if (user) {
          throw new HttpExceptionHandler(
            ErrorResponse.create(ERRORS.AUTH.EMAIL_EXISTS.msg_code, HttpStatus.NOT_FOUND),
            HttpStatus.NOT_FOUND
          );
        }

        dto.password = dto.password
          ? await bcrypt.hash(dto.password, 10)
          : null;

        if (!dto.username) {
          dto.username = dto.email.split('@')[0];
        }

        const newUser = await this.userRepo.createOne(manager, dto)
        return {
          user: {
            id: newUser.id,
            role: newUser.role,
            email: newUser.email
          }
        }
      })
    } catch (error) {
      handleException(error)
    }
  }
}