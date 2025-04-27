import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutPage } from './entities/aboutpage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AboutPageService {
  constructor(
    @InjectRepository(AboutPage)
    private readonly aboutpageRepository: Repository<AboutPage>,
  ) {}

  async findAboutPage(): Promise<AboutPage> {
    const aboutpage = await this.aboutpageRepository.query(
      'SELECT ABOUTPAGE.GET_ABOUTPAGE()',
    );
    return aboutpage[0].get_aboutpage as AboutPage;
  }
}
