import { Test, TestingModule } from '@nestjs/testing';
import { BiographyfolderService } from './biographyfolder.service';

describe('BiographyfolderService', () => {
  let service: BiographyfolderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiographyfolderService],
    }).compile();

    service = module.get<BiographyfolderService>(BiographyfolderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
