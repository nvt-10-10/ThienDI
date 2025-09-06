import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./controllers";
import { AuthService, TokenService } from "./services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/entities";
import { UserRepository } from "../share/repositories";
import { JwtStrategy } from "@app/core/strategy";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT.SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT.EXPIRE') },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],

  providers: [
    {
      provide: 'JWT_REFRESH_OPTIONS',
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT.REFRESH_SECRET'),
        expiresIn: configService.get<string>('JWT.REFRESH_EXPIRE'),
      }),
      inject: [ConfigService],
    },
    AuthService,
    TokenService,
    UserRepository,
    JwtStrategy
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule { }
