import { ConfigService } from '@nestjs/config';

export function getCommonMailContext(config: ConfigService): Record<string, any> {
  return {
    siteName: config.get('INFO.APP_NAME'),
    websiteUrl: config.get('INFO.APP_URL'),
    facebookUrl: config.get('INFO.FACEBOOK_URL'),
    instagramUrl: config.get('INFO.INSTAGRAM_URL'),
    supportUrl: config.get('INFO.SUPPORT_URL'),
    currentYear: new Date().getFullYear(),
    companyAddress: config.get('INFO.COMPANY_ADDRESS'),
    supportPhone: config.get('INFO.SUPPORT_PHONE'),
  };
}
