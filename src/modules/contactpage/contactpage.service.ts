import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactPage } from './entities/contactpage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactPageService {
  constructor(
    @InjectRepository(ContactPage)
    private readonly contactRepository: Repository<ContactPage>,
  ) {}

  async findContactpage(): Promise<ContactPage> {
    const contactPage = await this.contactRepository.query(
      'SELECT CONTACTPAGE.GET_CONTACTPAGE()',
    );
    return contactPage[0].get_contactpage as ContactPage;
  }
}
