import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutPage } from './entities/aboutpage.entity';
import { Repository } from 'typeorm';
import { ResponseData } from '@global/responseData';

@Injectable()
export class AboutPageService {
  constructor(
    @InjectRepository(AboutPage)
    private readonly aboutpageRepository: Repository<AboutPage>,
  ) {}

  async findAboutPage(): Promise<ResponseData<AboutPage>> {
    const aboutpage = await this.aboutpageRepository.query(
      'SELECT * FROM ABOUTPAGE.GET_ABOUTPAGE()',
    );
    return {
      statusCode: 200,
      ok: true,
      data: aboutpage[0].get_aboutpage,
    };
  }
}
