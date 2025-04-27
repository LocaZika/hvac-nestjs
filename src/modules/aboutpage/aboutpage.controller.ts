import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AboutPageService } from './aboutpage.service';
import { AboutPage } from './entities/aboutpage.entity';

@Controller('aboutpage')
export class AboutPageController {
  constructor(private readonly aboutpageService: AboutPageService) {}
  @Get()
  findAboutpage(): Promise<AboutPage> {
    try {
      return this.aboutpageService.findAboutPage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
