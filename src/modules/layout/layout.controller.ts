import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ResponseData } from '@global/responseData';
import { Layout } from './entities/layout.entity';
import { LayoutService } from './layout.service';
import { PublicRoute } from '@/decorators/route.decorator';

@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @PublicRoute()
  @Get()
  findLayout(): Promise<ResponseData<Layout>> {
    try {
      return this.layoutService.findLayout();
    } catch {
      throw new InternalServerErrorException('Something wrong in server!');
    }
  }
}
