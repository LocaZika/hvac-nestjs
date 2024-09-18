import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTE_KEY: string = 'publicRoute';
export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE_KEY, true);
export const PRIVATE_ROUTE_KEY: string = 'privateRoute';
export const PrivateRoute = () => SetMetadata(PRIVATE_ROUTE_KEY, true);
