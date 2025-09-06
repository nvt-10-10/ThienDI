import { TokenService } from '@app/modules/auth/services';
import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server, Socket } from 'socket.io';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
    constructor(
        private readonly app: INestApplicationContext,
        private readonly tokenService: TokenService,
    ) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions): Server {
        const server = super.createIOServer(port, options);

        server.use(async (socket: Socket, next: (err?: Error) => void) => {
            const rawAuthHeader = socket.handshake.headers['authorization'];
            const token =
                socket.handshake.auth?.token ||
                socket.handshake.query?.token ||
                (typeof rawAuthHeader === 'string' && rawAuthHeader.startsWith('Bearer ')
                    ? rawAuthHeader.slice(7)
                    : undefined);

            if (!token) {
                // ✅ TypeScript hiểu rõ next là hàm nhận Error
                return next(new Error('Missing token'));
            }

            try {
                const payload = await this.tokenService.verifyToken(token);
                socket.data.user = payload;
                next();
            } catch (error) {
                console.error('Socket authentication error:', error);
                next(new Error('Unauthorized'));
            }
        });
        return server as Server;
    }
}
