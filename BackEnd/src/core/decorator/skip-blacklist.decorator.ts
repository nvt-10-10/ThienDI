import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_BLACKLIST_KEY = 'skipBlacklist';
export const SkipBlacklist = () => SetMetadata(IS_SKIP_BLACKLIST_KEY, true);
