import { Test, TestingModule } from '@nestjs/testing';
import { FeatureAccessResolver } from './feature-access.resolver';
import { FeatureAccessService } from './feature-access.service';

describe('FeatureAccessResolver', () => {
  let resolver: FeatureAccessResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureAccessResolver, FeatureAccessService],
    }).compile();

    resolver = module.get<FeatureAccessResolver>(FeatureAccessResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
