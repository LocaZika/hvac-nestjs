import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { HomePageService } from './homepage.service';
import { ResponseData } from '@global/responseData';
import { HomePage } from './entities/homepage.entity';

@Controller('homepage')
export class HomePageController {
  constructor(private readonly homepageService: HomePageService) {}
  @Get()
  findHomePage(): Promise<ResponseData<HomePage>> {
    try {
      return this.homepageService.findHomePage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
