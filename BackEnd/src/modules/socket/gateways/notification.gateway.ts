import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ClientEvents, ServerEvents } from "@app/prototype/enum";
import { Logger } from "@nestjs/common";
import { SocketRegistryService } from "../socket/services";

@WebSocketGateway(Number(process.env.PORT_SOCKET) || 3002, {
    cors: {
        origin: process.env.ORIGIN.split(',') || '*',
    },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(NotificationGateway.name);
    @WebSocketServer()
    server: Server;

    constructor(private socketRegistry: SocketRegistryService) { }

    handleConnection(client: Socket) {
        const user = client.data.user;
        this.socketRegistry.set(user.id, client.id);
        this.logger.log(`User ${user.id} connected as socket ${client.id}`);
        // Broadcast cho bạn bè biết user online
        this.server.emit(ServerEvents.USER_ONLINE, { userId: user.id });
    }

    handleDisconnect(client: Socket) {
        const user = client.data.user;
        this.socketRegistry.removeSocket(client.id);

        // Nếu user đã hết socket → mới emit offline
        if (!this.socketRegistry.isOnline(user.id.toString())) {
            this.server.emit(ServerEvents.USER_OFFLINE, { userId: user.id });
        }
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
        @MessageBody() payload: any,
        @ConnectedSocket() client: Socket,
    ) {
        const user = client.data.user;
        this.logger.log(`Received message from user ${user.id}:`, payload);

        client.emit(ServerEvents.PERSONAL_MESSAGE, {
            status: 'ok',
            originalMessage: payload,
        });
    }

    @SubscribeMessage(ClientEvents.GET_ONLINE_USERS)
    handleGetOnlineUsers(
        @ConnectedSocket() client: Socket
    ) {
        const onlineUserIds = this.socketRegistry.getOnlineUserIds();
        client.emit(ServerEvents.ONLINE_USERS_LIST, onlineUserIds);
    }

}
