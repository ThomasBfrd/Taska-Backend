import { Query, Resolver } from '@nestjs/graphql';
import { FeatureFlagService } from './feature-flag.service';
import { FeatureFlag } from './types/feature-flag.type';

@Resolver()
export class FeatureFlagResolver {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Query(() => [FeatureFlag], { name: 'features' })
  getFeaturesFlags() {
    return [];
  }
}
