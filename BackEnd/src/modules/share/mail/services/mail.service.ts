import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { getCommonMailContext } from '@app/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) { }

  async sendRegistrationEmail(to: string) {
    const common = getCommonMailContext(this.configService);
    const payload = {
      userName: "nvtuyen",
      otpCode: "1234",
      expiryMinutes: "15",
      verificationUrl: "123132"
    }
    await this.mailerService.sendMail({
      to,
      subject: `Xác nhận đăng ký tài khoản ${common.siteName}`,
      template: '../templates/register-verification',
      context: {
        ...common,
        userName: payload.userName,
        otpCode: payload.otpCode,
        expiryMinutes: payload.expiryMinutes,
        verificationUrl: payload.verificationUrl,
      },
    });
  }
}
