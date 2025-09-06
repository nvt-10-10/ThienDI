export enum ClientEvents {
  SEND_MESSAGE = 'send-message',
  JOIN_ROOM = 'join-room',
  GET_ONLINE_USERS = 'get_online_users',
}

export enum ServerEvents {
  PERSONAL_MESSAGE = 'personal-message', //Thông báo cho người nhận
  MESSAGE_RECEIVE = 'message-receive', //Thông báo cho người gửi
  ERROR = 'error',
  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
  ONLINE_USERS_LIST = 'online_users_list',
}