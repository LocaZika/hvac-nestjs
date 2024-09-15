import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ResponseData } from '@global/responseData';
import { CarPage } from './entities/carpage.entity';
import { CarPageService } from './carpage.service';

@Controller('carpage')
export class CarPageController {
  constructor(private readonly carpageService: CarPageService) {}
  @Get()
  findCarpage(): Promise<ResponseData<CarPage>> {
    try {
      return this.carpageService.findCarpage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
