import { Test, TestingModule } from '@nestjs/testing';
import { FeatureDataResolver } from './feature-data.resolver';
import { FeatureDataService } from './feature-data.service';

describe('FeatureDataResolver', () => {
  let resolver: FeatureDataResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureDataResolver, FeatureDataService],
    }).compile();

    resolver = module.get<FeatureDataResolver>(FeatureDataResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
