import { Test, TestingModule } from '@nestjs/testing';
import { AboutpageService } from './aboutpage.service';

describe('AboutpageService', () => {
  let service: AboutpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutpageService],
    }).compile();

    service = module.get<AboutpageService>(AboutpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
