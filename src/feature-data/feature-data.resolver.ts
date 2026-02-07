import { Args, Query, Resolver } from '@nestjs/graphql';
import { FeatureDataService } from './feature-data.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/auth.guard';
import { FeatureData } from './types/feature-data.type';
import { Profile } from 'src/profile/types/profile.type';

@Resolver()
export class FeatureDataResolver {
  constructor(private readonly featureDataService: FeatureDataService) {}

  @Query(() => [FeatureData], { name: 'featuresForProfile' })
  @UseGuards(GqlAuthGuard)
  public getEnabledFeaturesForUser(
    @Args('profileId', { type: () => String }) profile: Profile,
  ) {
    return this.featureDataService.getEnabledFeaturesForUser(profile);
  }
}
