import { JwtGuard } from '@auth/guards/jwt.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export const PrivateRoute = () =>
  applyDecorators(UseGuards(JwtGuard, RolesGuard));
