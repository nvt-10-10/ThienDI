import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_LAST_REQUEST_KEY = 'skipLastRequest';
export const SkipLastRequest = () => SetMetadata(IS_SKIP_LAST_REQUEST_KEY, true);
