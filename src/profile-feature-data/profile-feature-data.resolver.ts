import { Resolver } from '@nestjs/graphql';
import { ProfileFeatureDataService } from './profile-feature-data.service';

@Resolver()
export class ProfileFeatureDataResolver {
  constructor(
    private readonly profileFeatureDataService: ProfileFeatureDataService,
  ) {}
}
