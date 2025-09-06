import { TokenService } from "@app/modules/auth/services";
import { INestApplicationContext, Injectable } from "@nestjs/common";
import { ServerOptions } from "socket.io";
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from "mysql2/typings/mysql/lib/Server";

@Injectable()
export class AuthenticatedSocketIoAdapter extends IoAdapter {

    constructor(private app: INestApplicationContext,
        private tokenService: TokenService,) {
        super();
    }

    createIOServer(port: number, options?: ServerOptions): Server {
        const server = super.createIOServer(port, options);
        server.use(async (socket, next) => {
            const rawAuthHeader = socket.handshake.headers['authorization'];
            const token =
                socket.handshake.auth?.token ||
                socket.handshake.query?.token ||
                (typeof rawAuthHeader === 'string' && rawAuthHeader.startsWith('Bearer ')
                    ? rawAuthHeader.slice(7) // Cắt "Bearer "
                    : undefined);

            try {
                const payload = await this.tokenService.verifyToken(token); // Xác thực
                socket.data.user = payload; // Gắn user vào socket
                next();
            } catch (error) {
                console.error('Socket authentication error:', error);
                next(new Error('Unauthorized'));
            }
        });

        return server as Server;
    }
}
