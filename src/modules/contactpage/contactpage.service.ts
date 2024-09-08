import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactPage } from './entities/contactpage.entity';
import { Repository } from 'typeorm';
import { ResponseData } from 'src/global/responseData';

@Injectable()
export class ContactPageService {
  constructor(
    @InjectRepository(ContactPage)
    private readonly contactRepository: Repository<ContactPage>,
  ) {}

  async findContactpage(): Promise<ResponseData<ContactPage>> {
    const contactPage = await this.contactRepository.query(
      'SELECT * FROM CONTACTPAGE.GET_CONTACTPAGE()',
    );
    return {
      statusCode: 200,
      ok: true,
      data: contactPage[0].get_contactpage,
    };
  }
}
