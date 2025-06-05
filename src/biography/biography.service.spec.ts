import { Test, TestingModule } from '@nestjs/testing';
import { BiographyService } from './biography.service';

describe('BiographyService', () => {
  let service: BiographyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiographyService],
    }).compile();

    service = module.get<BiographyService>(BiographyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
