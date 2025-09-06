import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ClientEvents, MessageEventEnum, ServerEvents } from "@app/prototype/enum";
import { SocketRegistryService } from "../services/socket-registry.service";
import { Logger } from "@nestjs/common";
import EventEmitter2 from "eventemitter2";
const allowedOrigins = process.env.ORIGIN
    ? process.env.ORIGIN.split(',').map(origin => origin.trim())
    : '*';


@WebSocketGateway(Number(process.env.PORT_SOCKET) || 3002, {
    cors: {
        origin: allowedOrigins
    },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(NotificationGateway.name);
    @WebSocketServer()
    server: Server;

    constructor(
        private socketRegistry: SocketRegistryService,
        private readonly eventEmit: EventEmitter2
    ) { }

    handleConnection(client: Socket) {
        const user = client.data.user;
        this.socketRegistry.set(user.id, client.id);
        this.logger.log(`User ${user.id} connected as socket ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.socketRegistry.removeSocket(client.id);
    }

    sendMessageToUser(user_id: number, message: any) {
        const socketId = this.socketRegistry.getSocketId(user_id.toString());
        if (socketId) {
            this.logger.log(`Sending message to user ${user_id} on socket ${socketId}: ${message}`);
            this.server.to(socketId).emit(ServerEvents.PERSONAL_MESSAGE, message);
        }
    }

    @SubscribeMessage(ClientEvents.SEND_MESSAGE)
    handleClientMessage(
        @MessageBody() payload: { to_user_id: number; text: string },
        @ConnectedSocket() client: Socket,
    ) {
        const sender = client.data.user;

        const { to_user_id, text } = payload;

        this.logger.log(`User ${sender.id} gửi đến ${to_user_id}: ${text}`);

        // Gửi lại cho người gửi (hiển thị "đã gửi")
        client.emit(ServerEvents.MESSAGE_RECEIVE, {
            from_user_id: sender.id,
            to_user_id,
            text,
            self: true, // đánh dấu tin nhắn của chính mình
        });

        // Gửi cho người nhận nếu có socketId
        const toSocketId = this.socketRegistry.getSocketId(to_user_id.toString());
        if (toSocketId) {
            this.server.to(toSocketId).emit(ServerEvents.PERSONAL_MESSAGE, {
                from_user_id: sender.id,
                to_user_id,
                text,
                self: false,
                username: sender.username, // Giả sử sender có thuộc tính username
            });



        } else {
            this.logger.warn(`User ${to_user_id} chưa online hoặc không có socket.`);
        }

        this.eventEmit.emit(MessageEventEnum.MESSAGE_CREATED, {
            sender_id: sender.id, // ID của người gửi
            receiver_id: to_user_id, // ID của người nhận (chỉ dùng khi không phải nhóm)
            content: text, // Nội dung tin nhắn
            is_group: false, // true nếu là nhóm, false nếu là chat 1-1
            conversation_id: null, // ID cuộc trò chuyện (nếu đã biết, dùng
        });
    }

}
