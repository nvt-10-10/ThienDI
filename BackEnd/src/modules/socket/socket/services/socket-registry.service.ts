import { Injectable } from "@nestjs/common";

@Injectable()
export class SocketRegistryService {
    private userToSocket = new Map<string, string>();
    private socketToUser = new Map<string, string>();
    private userSockets = new Map<string, Set<string>>();

    set(userId: string, socketId: string) {
        this.userToSocket.set(String(userId), socketId);
        this.socketToUser.set(socketId, userId);
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, new Set());
        }
        this.userSockets.get(userId).add(socketId);
    }

    getSocketId(userId: string | number): string | undefined {
        return this.userToSocket.get(String(userId));
    }

    removeSocket(socketId: string) {
        const userId = this.socketToUser.get(socketId);
        if (userId) {
            this.userToSocket.delete(userId);
            this.userSockets.delete(userId);
        }
        this.socketToUser.delete(socketId);
    }


    getSocketIds(userId: string): string[] {
        return Array.from(this.userSockets.get(userId) || []);
    }

    isOnline(userId: string): boolean {
        return this.userSockets.has(userId);
    }

    getOnlineUserIds(): string[] {
        return Array.from(this.userSockets.keys());
    }
}
