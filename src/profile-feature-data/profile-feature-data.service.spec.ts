import { Test, TestingModule } from '@nestjs/testing';
import { ProfileFeatureDataService } from './profile-feature-data.service';

describe('ProfileFeatureDataService', () => {
  let service: ProfileFeatureDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileFeatureDataService],
    }).compile();

    service = module.get<ProfileFeatureDataService>(ProfileFeatureDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
