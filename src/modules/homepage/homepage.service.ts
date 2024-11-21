import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseData } from '@global/responseData';
import { Repository } from 'typeorm';
import { HomePage } from './entities/homepage.entity';

@Injectable()
export class HomePageService {
  constructor(
    @InjectRepository(HomePage)
    private readonly homepageRepository: Repository<HomePage>,
  ) {}
  async findHomePage(): Promise<ResponseData<HomePage>> {
    const homepage = await this.homepageRepository.query(
      'SELECT HOMEPAGE.GET_HOMEPAGE()',
    );
    return {
      statusCode: 200,
      ok: true,
      data: homepage[0].get_homepage,
    };
  }
}
