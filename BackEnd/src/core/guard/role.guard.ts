// import { Role } from '@app/prototype/enum';
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorator';
// import { UserService } from '@app/modules/shared/user/user.service';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector, private readonly userService: UserService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     const userEntity = await this.userService.findByField('email', user.email);
//     const userRoles = [userEntity.role];

//     if (userRoles?.includes(Role.SUPER_ADMIN)) {
//       return true;
//     }
//     return requiredRoles.some((role) => userRoles?.includes(role));
//   }
// }
