import { MailerOptions } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from "path";

export const mailerConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    service: 'gmail',
    auth: {
      user: configService.get('EMAIL.USERNAME'),
      pass: configService.get('EMAIL.PASSWORD'),
    },
  },
  defaults: {
    from: `"No Reply" <${configService.get('EMAIL.USERNAME')}>`,
  },
  template: {
    dir: join(__dirname, '../modules/share/mail', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
