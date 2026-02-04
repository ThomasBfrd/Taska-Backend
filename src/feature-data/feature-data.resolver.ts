import { Args, Query, Resolver } from '@nestjs/graphql';
import { FeatureDataService } from './feature-data.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/auth.guard';
import { FeatureData } from './types/feature-data.type';

@Resolver()
export class FeatureDataResolver {
  constructor(private readonly featureDataService: FeatureDataService) {}

  @Query(() => [FeatureData], { name: 'featuresForProfile' })
  @UseGuards(GqlAuthGuard)
  public getEnabledFeaturesForUser(
    @Args('profileId', { type: () => String }) profileId: string,
  ) {
    return this.featureDataService.getEnabledFeaturesForUser(profileId);
  }
}
