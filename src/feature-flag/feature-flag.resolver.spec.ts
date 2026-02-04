import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagResolver } from './feature-flag.resolver';
import { FeatureFlagService } from './feature-flag.service';

describe('FeatureFlagResolver', () => {
  let resolver: FeatureFlagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureFlagResolver, FeatureFlagService],
    }).compile();

    resolver = module.get<FeatureFlagResolver>(FeatureFlagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
