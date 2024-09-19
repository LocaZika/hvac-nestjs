import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ContactPageService } from './contactpage.service';
import { ResponseData } from '@global/responseData';
import { ContactPage } from './entities/contactpage.entity';
import { PublicRoute } from '@/decorators/route.decorator';

@Controller('contactpage')
export class ContactPageController {
  constructor(private readonly contactpageService: ContactPageService) {}

  @PublicRoute()
  @Get()
  findContactpage(): Promise<ResponseData<ContactPage>> {
    try {
      return this.contactpageService.findContactpage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
