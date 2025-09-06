import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '@app/prototype/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lấy token từ header Authorization: Bearer ...
      secretOrKey: configService.get<string>('JWT.SECRET'),    // lấy SECRET từ config
    });
  }

  validate(payload: IJwtPayload): IJwtPayload {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      key: payload.key,
    };
  }
}
