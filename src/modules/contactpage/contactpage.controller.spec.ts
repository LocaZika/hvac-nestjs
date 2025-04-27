import { Test, TestingModule } from '@nestjs/testing';
import { ContactpageController } from './contactpage.controller';
import { ContactpageService } from './contactpage.service';

describe('ContactpageController', () => {
  let controller: ContactpageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactpageController],
      providers: [ContactpageService],
    }).compile();

    controller = module.get<ContactpageController>(ContactpageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
