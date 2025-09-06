export interface CreateMessageDto {
  sender_id: number; // ID của người gửi
  receiver_id: number; // ID của người nhận (chỉ dùng khi không phải nhóm)
  content: string; // Nội dung tin nhắn
  is_group: boolean; // true nếu là nhóm, false nếu là chat 1-1
  conversation_id?: number; // ID cuộc trò chuyện (nếu đã biết, dùng
}