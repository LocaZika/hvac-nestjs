import { SetMetadata } from '@nestjs/common';

export const IS_PAGINATED = 'isPaginated';
export const Paginated = () => SetMetadata(IS_PAGINATED, true);
