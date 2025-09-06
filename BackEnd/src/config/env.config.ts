export default () => ({
  APP_NAME: process.env.APP_NAME || 'My Nestjs',
  APP_DOMAIN: process.env.APP_DOMAIN || 'http://example.demo.com',
  APP_LOCAL: process.env.APP_URL || 'http://localhost:3000',
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV,
  IS_DEVELOP: process.env.NODE_ENV === 'development',
  APP_KEY: process.env.APP_KEY,
  BACKEND_URL: process.env.BACKEND_URL,
  WEB_URL: process.env.WEB_URL,
  INFO: {
    SITE_NAME: process.env.APP_NAME || 'GroceryMart',
    WEBSITE_URL: process.env.APP_URL || 'https://grocerymart.vn',

    FACEBOOK_URL: process.env.MAIL_FACEBOOK_URL || '',
    INSTAGRAM_URL: process.env.MAIL_INSTAGRAM_URL || '',
    SUPPORT_URL: process.env.MAIL_SUPPORT_URL || '',

    COMPANY_ADDRESS: process.env.MAIL_COMPANY_ADDRESS || '',
    SUPPORT_PHONE: process.env.MAIL_SUPPORT_PHONE || '',

    CURRENT_YEAR: new Date().getFullYear(),
  },

  JWT: {
    SECRET: process.env.JWT_SECRET || 'access_token_mhp',
    EXPIRE: process.env.JWT_EXPIRE || '1d',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_token_mhp',
    REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
    REFRESH_SECRET_FORGOT:
      process.env.JWT_REFRESH_SECRET_FORGOT || 'refresh_token_forgot',
    REFRESH_EXPIRE_FORGOT: process.env.JWT_REFRESH_EXPIRE_FORGOT || '2m',
  },
  COOKIE: {
    NAME: process.env.COOKIE_NAME || 'cookie_name_mhp',
    SECRET: process.env.COOKIE_SECRET || 'cookie_secret_mhp',
  },
  THROTTLE: {
    TTL: Number(process.env.THROTTLE_TTL || 60),
    LIMIT: Number(process.env.THROTTLE_LIMIT || 60),
  },
  SALT_ROUND: 10,
  ROOT_PATH:
    process.cwd() + (process.env.NODE_ENV === 'development' ? '/src' : '/dist'),
  PUBLIC_PATH:
    process.cwd() +
    (process.env.NODE_ENV === 'development' ? '/src' : '/dist') +
    '/resources/public',
  DATABASE: {
    CONNECT: process.env.DATABASE_CONNECT as any,
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: Number(process.env.REDIS_PORT || 6379),
    USER: process.env.REDIS_USER,
    PASSWORD: process.env.REDIS_PASS,
    URL: process.env.REDIS_URL || 'redis://localhost:6379',
    TLS: process.env.REDIS_USE_TLS === 'true'
  },
  EMAIL: {
    HOST: process.env.MAIL_HOST,
    PORT: Number(process.env.MAIL_PORT),
    USERNAME: process.env.MAIL_USER,
    PASSWORD: process.env.MAIL_PASSWORD,
    FROM: process.env.MAIL_FROM,
  },
  WALLET: {
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  },
  TASK_SCHEDULE_FLAG: process.env.TASK_SCHEDULE_FLAG,
  FORGOT_PASSWORD_TTL: Number(process.env.FORGOT_PASSWORD_TTL || 15),
  WHITELIST_DOMAINS: (process.env.WHITELIST_DOMAINS || 'localhost').split(','),
  CONTACT_MAIL: process.env.CONTACT_MAIL || 'support@diginex-climate.com',
  FILE_LIMIT: {
    ASSESSMENT_DOCUMENT:
      Number(process.env.FILE_LIMIT_ASSESSMENT_DOCUMENT) || 5,
  },
  AUTH_TOKEN_RMA: process.env.AUTH_TOKEN_RMA,
  GOOGLE: {
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  },
  SESSION_RE_CONFIRM_LOGIN: Number(process.env.SESSION_RE_CONFIRM_LOGIN || 180000),
  SESSION_TIMEOUT: Number(process.env.SESSION_TIMEOUT || 900000),
  NETWORK: process.env.NETWORK || "MAINNET",
  SECRET_KEY: process.env.SECRET_KEY,
  IS_SCAN_WALLET: process.env.IS_SCAN_WALLET || true,
  PACKAGE_FUND_VIRTUAL_EXPIRATION_MS: Number(process.env.PACKAGE_FUND_VIRTUAL_EXPIRATION_MS || 1800000),
  TOSI_REWARD_ON_CREATE: Number(process.env.TOSI_REWARD_ON_PACKAGE_CREATE) || 500,
  IS_UPDATE_BALANCE_WALLET: process.env.IS_UPDATE_BALANCE_WALLET === 'true',
  X_CMC_PRO_API_KEY: process.env.X_CMC_PRO_API_KEY,
  IS_FAKE_TOKEN: process.env.IS_FAKE_TOKEN === 'true' && process.env.NODE_ENV === 'development',
  ALLOW_CREATE_PACKAGE: process.env.ALLOW_CREATE_PACKAGE === "true",
  API_KEY: {
    API_KEY_GROQ: process.env.API_KEY_GROQ || ''
  }
});
