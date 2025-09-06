import { HttpExceptionHandler } from '@app/common/error';
import { ERRORS } from '@app/common/message';
import { ErrorResponse } from '@app/common/response';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

const logger = new Logger("Exception")

export function handleException(error: unknown): never {
    // In case session expired: do not log error in this case to prevent trash/uneccessary log in production
    if (error instanceof HttpExceptionHandler) {
        const response = error.getResponse() as ErrorResponse<any>;
        if (response.msg === ERRORS.SYSTEM.SESSION_EXPIRED.msg_code) {
            throw error;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    logger.error(error instanceof Error ? error.message : String(error), error instanceof Error ? error.stack : '');
    if (error instanceof HttpException) {
        throw error;
    }
    throw new HttpExceptionHandler(
        ErrorResponse.create(ERRORS.SYSTEM.SYSTEM_ERROR.msg_code, HttpStatus.INTERNAL_SERVER_ERROR),
        HttpStatus.INTERNAL_SERVER_ERROR
    );
}
