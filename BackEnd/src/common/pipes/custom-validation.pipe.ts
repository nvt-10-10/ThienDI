import { ValidationError } from 'class-validator';
import { ERRORS } from '../message';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

const customMessages: Record<string, string> = {
  isNotEmpty: ERRORS.VALIDATE.IS_NOT_EMPTY.msg_code,
  isEmail: ERRORS.VALIDATE.IS_EMAIL.msg_code,
  length: ERRORS.VALIDATE.LENGTH.msg_code,
  minLength: ERRORS.VALIDATE.MIN_LENGTH.msg_code,
  maxLength: ERRORS.VALIDATE.MAX_LENGTH.msg_code,
  isNumber: ERRORS.VALIDATE.IS_NUMBER.msg_code,
  isInt: ERRORS.VALIDATE.IS_INT.msg_code,
  isBoolean: ERRORS.VALIDATE.IS_BOOLEAN.msg_code,
  isArray: ERRORS.VALIDATE.IS_ARRAY.msg_code,
  isDate: ERRORS.VALIDATE.IS_DATE.msg_code,
  isEnum: ERRORS.VALIDATE.IS_ENUM.msg_code,
  isUrl: ERRORS.VALIDATE.IS_URL.msg_code,
  isUUID: ERRORS.VALIDATE.IS_UUID.msg_code,
  isPhoneNumber: ERRORS.VALIDATE.IS_PHONE_NUMBER.msg_code,
  isPositive: ERRORS.VALIDATE.IS_POSITIVE.msg_code,
  isNegative: ERRORS.VALIDATE.IS_NEGATIVE.msg_code,
  min: ERRORS.VALIDATE.MIN.msg_code,
  max: ERRORS.VALIDATE.MAX.msg_code,
  isAlpha: ERRORS.VALIDATE.IS_ALPHA.msg_code,
  isAlphanumeric: ERRORS.VALIDATE.IS_ALPHANUMERIC.msg_code,
  isLowercase: ERRORS.VALIDATE.IS_LOWERCASE.msg_code,
  isUppercase: ERRORS.VALIDATE.IS_UPPERCASE.msg_code,
  isStrongPassword: ERRORS.VALIDATE.IS_STRONG_PASSWORD.msg_code,
};

/**
 * Đệ quy xử lý ValidationError và trả về object với key là tên trường và value là danh sách lỗi
 */
function formatErrors(
  errors: ValidationError[],
  parentPath = '',
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const error of errors) {
    const propertyPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;
    const messages: string[] = [];

    if (error.constraints) {
      for (const key of Object.keys(error.constraints)) {
        const customMessage: string =
          (error.contexts?.[key] as string) ||
          customMessages[key] ||
          error.constraints[key];

        messages.push(customMessage);
      }

      result[propertyPath] = messages;
    }

    if (error.children?.length) {
      const childFormatted = formatErrors(error.children, propertyPath);
      Object.assign(result, childFormatted);
    }
  }

  return result;
}

export const CustomValidationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) => {
    try {
      const formattedErrors = formatErrors(errors);

      return new UnprocessableEntityException({
        http_code: HttpStatus.UNPROCESSABLE_ENTITY,
        msg: ERRORS.SYSTEM.VALIDATE_ERROR.msg_code,
        errors: formattedErrors,
      });
    } catch {
      return new UnprocessableEntityException({
        http_code: HttpStatus.UNPROCESSABLE_ENTITY,
        msg: ERRORS.SYSTEM.VALIDATE_ERROR.msg_code,
        errors,
      });
    }
  },
});
