import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomePage } from './entities/homepage.entity';

@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(HomePage)
    private readonly homepageRepository: Repository<HomePage>,
  ) {}
  async findHomePage(): Promise<HomePage> {
    const homepage = await this.homepageRepository.query(
      'SELECT HOMEPAGE.GET_HOMEPAGE()',
    );
    return homepage[0].get_homepage as HomePage;
  }
}
