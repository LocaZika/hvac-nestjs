import { ROLES_KEY } from '@decorators/roles.decorator';
import { ROLES } from '@auth/roles/roles.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context
      .switchToHttp()
      .getRequest<{ user: { role: ROLES[] } | undefined }>();
    console.log('RolesGuard: ', req);
    return requiredRoles.some((role) => req.user?.role?.includes(role));
  }
}
