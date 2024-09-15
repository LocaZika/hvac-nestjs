import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ContactPageService } from './contactpage.service';
import { ResponseData } from '@global/responseData';
import { ContactPage } from './entities/contactpage.entity';

@Controller('contactpage')
export class ContactPageController {
  constructor(private readonly contactpageService: ContactPageService) {}

  @Get()
  findContactpage(): Promise<ResponseData<ContactPage>> {
    try {
      return this.contactpageService.findContactpage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
