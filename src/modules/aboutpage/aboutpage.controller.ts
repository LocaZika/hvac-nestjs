import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AboutPageService } from './aboutpage.service';
import { ResponseData } from '@global/responseData';
import { AboutPage } from './entities/aboutpage.entity';
import { PublicRoute } from '@/decorators/route.decorator';

@Controller('aboutpage')
export class AboutPageController {
  constructor(private readonly aboutpageService: AboutPageService) {}
  @PublicRoute()
  @Get()
  findAboutpage(): Promise<ResponseData<AboutPage>> {
    try {
      return this.aboutpageService.findAboutPage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
