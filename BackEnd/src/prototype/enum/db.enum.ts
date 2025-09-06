export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum UserStatusEnum {
  ACTIVE = 'active',         // Đang hoạt động
  PAUSED = 'paused',     // Không hoạt động (có thể do chưa xác minh email, hoặc bị khóa tạm thời)
  BANNED = 'banned',         // Đã bị khóa vĩnh viễn
  PENDING = 'pending',       // Đang chờ xử lý (VD: đăng ký, chờ duyệt)
  DELETED = 'deleted',       // Đã bị xóa (hoặc đánh dấu là xóa mềm - soft delete)
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}