import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AboutPageService } from './aboutpage.service';
import { ResponseData } from 'src/global/responseData';
import { AboutPage } from './entities/aboutpage.entity';

@Controller('aboutpage')
export class AboutPageController {
  constructor(private readonly aboutpageService: AboutPageService) {}
  @Get()
  findAboutpage(): Promise<ResponseData<AboutPage>> {
    try {
      return this.aboutpageService.findAboutPage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
