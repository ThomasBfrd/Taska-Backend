import { Test, TestingModule } from '@nestjs/testing';
import { ProfileFeatureDataResolver } from './profile-feature-data.resolver';
import { ProfileFeatureDataService } from './profile-feature-data.service';

describe('ProfileFeatureDataResolver', () => {
  let resolver: ProfileFeatureDataResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileFeatureDataResolver, ProfileFeatureDataService],
    }).compile();

    resolver = module.get<ProfileFeatureDataResolver>(ProfileFeatureDataResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
