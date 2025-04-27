import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getStatistic() {
    try {
      return this.adminService.getStatistic();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
