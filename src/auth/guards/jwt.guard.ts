import { PUBLIC_ROUTE_KEY } from '@/decorators/route.decorator';
import { UserEntity } from '@/modules/users/userBase/userEntity.base';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwtGuard') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const publicRoute = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (publicRoute) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = UserEntity>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid Access Token!');
    }
    return user;
  }
}
