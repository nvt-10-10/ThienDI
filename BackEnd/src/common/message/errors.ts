export const ERRORS = {
  SYSTEM: {
    UNAUTHORIZED: {
      msg_code: 'UNAUTHORIZED',
      message: 'Không được phép! Người dùng không tồn tại',
    },
    THIS_ACCESS_TOKEN_EXPIRED: {
      msg_code: 'THIS_ACCESS_TOKEN_EXPIRED',
      message: 'Access token đã hết hạn hoặc không hợp lệ',
    },
    SERVER_ERROR: {
      msg_code: 'INTERNAL_SERVER_ERROR',
      message: 'Lỗi máy chủ nội bộ',
    },
    NOT_FOUND: {
      msg_code: 'NOT_FOUND',
      message: 'Không tìm thấy',
    },
    BAD_REQUEST: {
      msg_code: 'BAD_REQUEST',
      message: 'Yêu cầu không hợp lệ',
    },
    FORBIDDEN: {
      msg_code: 'FORBIDDEN',
      message: 'Bạn không được phép thực hiện hành động này',
    },
    SESSION_EXPIRED: {
      msg_code: 'SESSION_EXPIRED',
      message: 'Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.',
    },
    TOKEN_EXPIRED: {
      msg_code: 'TOKEN_EXPIRED',
      message: 'Mã xác thực đã hết hạn. Vui lòng yêu cầu lại.',
    },
    VALIDATE_ERROR: {
      msg_code: 'VALIDATE_ERROR',
      message: 'Lỗi xác thực dữ liệu',
    },
    SYSTEM_ERROR: {
      msg_code: 'SYSTEM_ERROR',
      message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau',
    },
    SERVICE_UNAVAILABLE: {
      msg_code: 'SERVICE_UNAVAILABLE',
      message: 'Dịch vụ không khả dụng. Vui lòng thử lại sau',
    },
    SAME_WALLET_TRANSFER: {
      msg_code: 'SYSTEM_SAME_WALLET_TRANSFER',
      message: 'Không thể chuyển giữa cùng một ví.',
    },
    WALLET_NOT_FOUND_OR_INSUFFICIENT_BALANCE: {
      msg_code: 'WALLET_NOT_FOUND_OR_INSUFFICIENT_BALANCE',
      message: 'Ví nguồn không tồn tại hoặc số dư không đủ.',
    },
  },

  VALIDATE: {
    IS_NOT_EMPTY: {
      msg_code: 'FIELD_CANNOT_BE_EMPTY',
      message: 'Trường này không được để trống',
    },
    IS_EMAIL: {
      msg_code: 'EMAIL_FORMAT_INVALID',
      message: 'Email không hợp lệ',
    },
    LENGTH: {
      msg_code: 'LENGTH_INVALID',
      message: 'Độ dài không hợp lệ',
    },
    MIN_LENGTH: {
      msg_code: 'LENGTH_TOO_SHORT',
      message: 'Trường này quá ngắn',
    },
    MAX_LENGTH: {
      msg_code: 'LENGTH_TOO_LONG',
      message: 'Trường này quá dài',
    },
    MATCHES: {
      msg_code: 'FORMAT_INVALID',
      message: 'Trường này không đúng định dạng yêu cầu',
    },
    IS_NUMBER: {
      msg_code: 'VALUE_MUST_BE_NUMBER',
      message: 'Giá trị phải là số',
    },
    IS_INT: {
      msg_code: 'VALUE_MUST_BE_INTEGER',
      message: 'Giá trị phải là số nguyên',
    },
    IS_BOOLEAN: {
      msg_code: 'VALUE_MUST_BE_BOOLEAN',
      message: 'Giá trị phải là true hoặc false',
    },
    IS_ARRAY: {
      msg_code: 'VALUE_MUST_BE_ARRAY',
      message: 'Giá trị phải là một mảng',
    },
    IS_DATE: {
      msg_code: 'DATE_FORMAT_INVALID',
      message: 'Giá trị phải là ngày hợp lệ',
    },
    IS_ENUM: {
      msg_code: 'ENUM_VALUE_INVALID',
      message: 'Giá trị không hợp lệ',
    },
    IS_URL: {
      msg_code: 'URL_FORMAT_INVALID',
      message: 'Định dạng URL không hợp lệ',
    },
    IS_UUID: {
      msg_code: 'UUID_FORMAT_INVALID',
      message: 'ID không hợp lệ',
    },
    IS_PHONE_NUMBER: {
      msg_code: 'PHONE_NUMBER_FORMAT_INVALID',
      message: 'Số điện thoại không hợp lệ',
    },
    IS_POSITIVE: {
      msg_code: 'VALUE_MUST_BE_POSITIVE',
      message: 'Giá trị phải là số dương',
    },
    IS_NEGATIVE: {
      msg_code: 'VALUE_MUST_BE_NEGATIVE',
      message: 'Giá trị phải là số âm',
    },
    MIN: {
      msg_code: 'VALUE_TOO_SMALL',
      message: 'Giá trị quá nhỏ',
    },
    MAX: {
      msg_code: 'VALUE_TOO_LARGE',
      message: 'Giá trị quá lớn',
    },
    IS_ALPHA: {
      msg_code: 'ONLY_LETTERS_ALLOWED',
      message: 'Trường này chỉ được chứa chữ cái',
    },
    IS_ALPHANUMERIC: {
      msg_code: 'ONLY_LETTERS_AND_NUMBERS_ALLOWED',
      message: 'Trường này chỉ được chứa chữ cái và số',
    },
    IS_LOWERCASE: {
      msg_code: 'VALUE_MUST_BE_LOWERCASE',
      message: 'Trường này phải là chữ thường',
    },
    IS_UPPERCASE: {
      msg_code: 'VALUE_MUST_BE_UPPERCASE',
      message: 'Trường này phải là chữ in hoa',
    },
    IS_STRONG_PASSWORD: {
      msg_code: 'PASSWORD_TOO_WEAK',
      message:
        'Mật khẩu phải chứa ít nhất một chữ hoa, một số và một ký tự đặc biệt',
    },
  },

  AUTH: {
    USER_ALREADY_ACTIVE: {
      msg_code: 'USER_ALREADY_ACTIVE',
      message: 'Tài khoản đã được kích hoạt',
    },
    USER_NOT_FOUND: {
      msg_code: 'USER_NOT_FOUND',
      message: 'Không tìm thấy người dùng',
    },
    USER_NOT_ACTIVATED: {
      msg_code: 'USER_NOT_ACTIVATED',
      message: 'Tài khoản chưa được kích hoạt',
    },
    USER_LOCKED: {
      msg_code: 'USER_LOCKED',
      message: 'Tài khoản đã bị khóa',
    },
    USER_DELETED: {
      msg_code: 'USER_DELETED',
      message: 'Tài khoản đã bị xóa',
    },
    USER_PAUSED: {
      msg_code: 'USER_PAUSED',
      message: 'Tài khoản đã bị tạm dừng, vui lòng liên hệ admin để được hỗ trợ',
    },
    USER_BLOCKED: {
      msg_code: 'USER_BLOCKED',
      message: 'Tài khoản đã bị khóa, vui lòng liên hệ admin để được hỗ trợ',
    },
    USER_DISABLED: {
      msg_code: 'USER_DISABLED',
      message: 'Tài khoản đã bị vô hiệu hóa',
    },
    TOKEN_INVALID: {
      msg_code: 'TOKEN_INVALID',
      message: 'Token không hợp lệ hoặc không được cung cấp',
    },
    UNAUTHORIZED_TOKEN: {
      msg_code: 'UNAUTHORIZED_TOKEN',
      message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn',
    },
    EMAIL_NOT_FOUND: {
      msg_code: 'AUTH_EMAIL_NOT_FOUND',
      message: 'Email không tồn tại.',
    },
    EMAIL_EXISTS: {
      msg_code: 'AUTH_EMAIL_EXISTS',
      message: 'Email đã tồn tại.',
    },
    INVALID_PASSWORD: {
      msg_code: 'AUTH_INVALID_PASSWORD',
      message: 'Mật khẩu không chính xác.',
    },
    REQUIRE_2FA: {
      msg_code: 'AUTH_REQUIRE_2FA',
      message: 'Cần xác thực hai yếu tố.',
    },
    INVALID_2FA: {
      msg_code: 'AUTH_INVALID_2FA',
      message: 'Mã xác thực hai yếu tố không hợp lệ.',
    },
    INVALID_TOKEN: {
      msg_code: 'AUTH_INVALID_TOKEN',
      message: 'Token không hợp lệ hoặc đã hết hạn.',
    },
    INVALID_CAPTCHA: {
      msg_code: 'AUTH_INVALID_CAPTCHA',
      message: 'Captcha không hợp lệ hoặc đã hết hạn.',
    },
    REQUIRE_RECAPTCHA: {
      msg_code: 'REQUIRE_RECAPTCHA',
      message: 'Cần xác thực captcha.',
    },

    ACCOUNT_SESSION_CONCURRENT_LIMIT_REACHED: {
      msg_code: 'ACCOUNT_SESSION_CONCURRENT_LIMIT_REACHED',
      message: 'Số lượng người dùng truy cập cùng lúc đã vượt quá giới hạn.',
    },

    // RE_CONFIRM_LOGIN: {
    //   msg_code: 'RE_CONFIRM_LOGIN',
    //   message: 'Vui lòng xác thực lại tài khoản.',
    // },

    INVALID_CODE: {
      msg_code: 'AUTH_INVALID_CODE',
      message: 'Token không hợp lệ hoặc đã hết hạn.',
    },

    TOKEN_EXPIRED: {
      msg_code: 'AUTH_TOKEN_EXPIRED',
      message: 'Token đã hết hạn. Vui lòng đăng nhập lại.',
    },
    PASSWORD_MISMATCH: {
      msg_code: 'PASSWORD_MISMATCH',
      message: 'Mật khẩu xác nhận không khớp',
    },
  },


  TWO_FA: {
    TWO_FA_ENABLED: {
      msg_code: 'TWO_FA_ENABLED',
      message: 'Xác thực hai yếu tố đã được bật',
    }
  },

  TWO_FACTOR_AUTH: {
    INVALID_CODE: {
      msg_code: 'TWO_FACTOR_INVALID_CODE',
      message: 'Mã xác thực hai bước không hợp lệ!',
    },
    CODE_ALREADY_USED: {
      msg_code: 'TWO_FACTOR_CODE_ALREADY_USED',
      message: 'Mã xác thực hai bước này đã được sử dụng!',
    },
    CODE_EXPIRED: {
      msg_code: 'TWO_FACTOR_CODE_EXPIRED',
      message: 'Mã xác thực hai bước đã hết hạn!',
    },
    CODE_REQUIRED: {
      msg_code: 'TWO_FACTOR_CODE_REQUIRED',
      message: 'Mã xác thực hai bước là bắt buộc!',
    },
    TOO_MANY_ATTEMPTS: {
      msg_code: 'TWO_FACTOR_TOO_MANY_ATTEMPTS',
      message: 'Bạn đã nhập sai mã xác thực hai bước quá nhiều lần, hãy thử lại sau!',
    },
    GENERATION_FAILED: {
      msg_code: 'TWO_FACTOR_GENERATION_FAILED',
      message: 'Không thể tạo mã xác thực hai bước, vui lòng thử lại!',
    },
    NOT_ENABLED: {
      msg_code: 'TWO_FACTOR_NOT_ENABLED',
      message: 'Tài khoản của bạn chưa bật xác thực hai bước!',
    },
    ALREADY_ENABLED: {
      msg_code: 'TWO_FACTOR_ALREADY_ENABLED',
      message: 'Xác thực hai bước đã được bật trước đó!',
    },
    DISABLED: {
      msg_code: 'TWO_FACTOR_DISABLED',
      message: 'Xác thực hai bước đã được tắt!',
    }
  },

  PRODUCT: {
    NOT_FOUND: {
      msg_code: 'PRODUCT_NOT_FOUND',
      message: 'Sản phẩm không tồn tại',
    },
    NAME_EXISTS: {
      msg_code: 'PRODUCT_NAME_EXISTS',
      message: 'Tên sản phẩm đã tồn tại',
    },
    SLUG_EXISTS: {
      msg_code: 'PRODUCT_SLUG_EXISTS',
      message: 'Slug sản phẩm đã được sử dụng',
    },
    INVALID_CATEGORY: {
      msg_code: 'PRODUCT_INVALID_CATEGORY',
      message: 'Danh mục sản phẩm không hợp lệ',
    },
    TOO_MANY_IMAGES: {
      msg_code: 'PRODUCT_TOO_MANY_IMAGES',
      message: 'Chỉ được phép tải lên tối đa 6 ảnh',
    },
    INVALID_IMAGE_TYPE: {
      msg_code: 'PRODUCT_IMAGE_TYPE_INVALID',
      message: 'Định dạng ảnh không hợp lệ. Chỉ hỗ trợ JPG, PNG, WebP',
    },
    IMAGE_REQUIRED: {
      msg_code: 'PRODUCT_IMAGE_REQUIRED',
      message: 'Ảnh sản phẩm là bắt buộc',
    },
    IMAGE_NOT_FOUND: {
      msg_code: 'PRODUCT_IMAGE_NOT_FOUND',
      message: 'Một hoặc nhiều hình ảnh không tồn tại',
    },
    INVALID_IMAGE_PATH: {
      msg_code: 'PRODUCT_INVALID_IMAGE_PATH',
      message: 'Đường dẫn hình ảnh không hợp lệ',
    },
    REMOVE_IMAGE_FAILED: {
      msg_code: 'PRODUCT_REMOVE_IMAGE_FAILED',
      message: 'Xóa hình ảnh thất bại',
    },
  },
  CATEGORY: {
    NOT_FOUND: {
      msg_code: 'CATEGORY_NOT_FOUND',
      message: 'Danh mục không tồn tại',
    },
    NAME_EXISTS: {
      msg_code: 'CATEGORY_NAME_EXISTS',
      message: 'Tên danh mục đã được sử dụng',
    },
    DELETE_CONFLICT: {
      msg_code: 'CATEGORY_DELETE_CONFLICT',
      message: 'Không thể xóa danh mục vì đang có sản phẩm liên quan',
    },
    INVALID_ID: {
      msg_code: 'CATEGORY_INVALID_ID',
      message: 'ID danh mục không hợp lệ',
    },
  },

  MEDIA: {
    NOT_FOUND: {
      msg_code: 'MEDIA_NOT_FOUND',
      message: 'Sản phẩm không tồn tại',
    },
    TITLE_EXISTS: {
      msg_code: 'MEDIA_TITLE_EXISTS',
      message: 'Tiêu đề đã tồn tại',
    },
  }

};
