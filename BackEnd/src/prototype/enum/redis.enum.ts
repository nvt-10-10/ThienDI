export enum RedisKey {
  TWO_FA = '2fa',
  CONFIRM_TWO_FA = 'confirm-2fa',
  LOGIN_OTP = 'login',
  LOGIN_CODE = 'login_code',
  RECONFIRM_EMAIL_CODE = 'reconfirm-email-code',
  REGISTER_OTP = 'register-otp',
  FORGOT_PASSWORD = 'forgot-password',
  RE_CONFIRM_LOGIN = "reconfirm-login",
  RE_CONFIRM_LOGIN_CODE = "reconfirm-login-code",
  SESSION_RE_CONFIRM_LOGIN = "session-reconfirm-login",
  RE_CONFIRM_LOGIN_CODE_TIME = "reconfirm-login-code-time",
  // Admin
  ADMIN_CONFIRM_UPDATE_SETTING = "admin-confirm-update-setting",
  ADMIN_CONFIRM_UPDATE_SETTING_REWARD_MORE = "admin-confirm-update-setting-reward-more",
}
