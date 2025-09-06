// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { AuthService, LoginService } from '@app/modules/auth/services';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//     constructor(
//         private configService: ConfigService,
//         private authService: LoginService,
//     ) {
//         super({
//             clientID: configService.get<string>('GOOGLE.GOOGLE_CLIENT_ID'),
//             clientSecret: configService.get<string>('GOOGLE.GOOGLE_CLIENT_SECRET'),
//             callbackURL: configService.get<string>('GOOGLE.GOOGLE_CALLBACK_URL'),
//             scope: ['email', 'profile'],
//         });
//     }

//     async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
//         const { name, emails, photos } = profile;
//         const user = await this.authService.validateGoogleUser(emails[0].value);
//         done(null, user);
//     }
// }
