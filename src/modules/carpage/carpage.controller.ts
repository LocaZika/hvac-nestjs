import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ResponseData } from '@global/responseData';
import { CarPage } from './entities/carpage.entity';
import { CarPageService } from './carpage.service';
import { PublicRoute } from '@/decorators/route.decorator';

@Controller('carpage')
export class CarPageController {
  constructor(private readonly carpageService: CarPageService) {}
  @PublicRoute()
  @Get()
  findCarpage(): Promise<ResponseData<CarPage>> {
    try {
      return this.carpageService.findCarpage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
