import { Controller, Get } from '@nestjs/common';
import { MailService } from '../services';

@Controller('api/mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Get('/send-test')
  async sendTestEmail() {
    await this.mailService.sendRegistrationEmail("nvtuyen10102002@gmail.com");

  }
}
