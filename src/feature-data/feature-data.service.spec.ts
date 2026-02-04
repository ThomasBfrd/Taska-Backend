import { Test, TestingModule } from '@nestjs/testing';
import { FeatureDataService } from './feature-data.service';

describe('FeatureDataService', () => {
  let service: FeatureDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureDataService],
    }).compile();

    service = module.get<FeatureDataService>(FeatureDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
