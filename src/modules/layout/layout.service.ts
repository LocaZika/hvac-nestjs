import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Layout } from './entities/layout.entity';
import { Repository } from 'typeorm';
import { ResponseData } from 'src/global/responseData';

@Injectable()
export class LayoutService {
  constructor(
    @InjectRepository(Layout)
    private readonly layoutRepository: Repository<Layout>,
  ) {}
  async findLayout(): Promise<ResponseData<Layout>> {
    const layout = await this.layoutRepository.query(
      'SELECT * FROM LAYOUT.GET_LAYOUT()',
    );
    return {
      statusCode: 200,
      ok: true,
      data: layout[0].get_layout,
    };
  }
}
