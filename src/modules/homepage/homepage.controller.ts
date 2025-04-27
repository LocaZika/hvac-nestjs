import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { HomePageService } from './homepage.service';
import { HomePage } from './entities/homepage.entity';

@Controller('homepage')
export class HomePageController {
  constructor(private readonly homepageService: HomePageService) {}

  @Get()
  findHomePage(): Promise<HomePage> {
    try {
      return this.homepageService.findHomePage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
