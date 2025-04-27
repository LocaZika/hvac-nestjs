import { Test, TestingModule } from '@nestjs/testing';
import { ContactpageService } from './contactpage.service';

describe('ContactpageService', () => {
  let service: ContactpageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactpageService],
    }).compile();

    service = module.get<ContactpageService>(ContactpageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
