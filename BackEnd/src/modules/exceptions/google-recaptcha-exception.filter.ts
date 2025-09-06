import { ERRORS } from '@app/common/message';
import { HttpResponse } from '@app/common/response';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class GoogleRecaptchaExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const recaptcha = request.body.recaptcha;
    if (!recaptcha)
      return response.json(
        HttpResponse.error(
          ERRORS.AUTH.REQUIRE_RECAPTCHA.msg_code,
          HttpStatus.BAD_REQUEST,
        ),
      );

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const message = exception?.message
      ? ERRORS.AUTH.INVALID_CAPTCHA.msg_code
      : 'Google reCAPTCHA verification failed';

    response.status(status).json({
      success: false,
      code: HttpStatus.BAD_REQUEST,
      message,
      errors: exception.getResponse(),
    });
  }
}
