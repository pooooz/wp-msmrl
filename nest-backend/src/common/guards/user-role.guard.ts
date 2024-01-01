import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLE_KEY } from '../decorators/user-role.decorator';
import { UserRole } from '../contracts';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserRoles = this.reflector.getAllAndOverride<UserRole[]>(
      USER_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredUserRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    return requiredUserRoles.includes(request.user.role);
  }
}
