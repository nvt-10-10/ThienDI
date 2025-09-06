import { Module } from "@nestjs/common";
import { NotificationGateway } from "./gateways";
import { SocketRegistryService } from "./services";
import { AuthenticatedSocketIoAdapter } from "./adapter";
import { TokenService } from "@app/modules/auth/services";
import { AuthModule } from "@app/modules/auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [
    NotificationGateway,
    SocketRegistryService,
    AuthenticatedSocketIoAdapter,
    TokenService
  ],
  exports: [AuthenticatedSocketIoAdapter]
})
export class SocketModule { }