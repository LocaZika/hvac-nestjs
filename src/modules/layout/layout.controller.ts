import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { Layout } from './entities/layout.entity';
import { LayoutService } from './layout.service';

@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  @Get()
  findLayout(): Promise<Layout> {
    try {
      return this.layoutService.findLayout();
    } catch {
      throw new InternalServerErrorException('Something wrong in server!');
    }
  }
}
