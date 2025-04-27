import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ContactPageService } from './contactpage.service';
import { ContactPage } from './entities/contactpage.entity';

@Controller('contactpage')
export class ContactPageController {
  constructor(private readonly contactpageService: ContactPageService) {}

  @Get()
  findContactpage(): Promise<ContactPage> {
    try {
      return this.contactpageService.findContactpage();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
