import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './types/profile.type';
import { GqlAuthGuard } from 'src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FeatureData } from 'src/profile-feature-data/profile-feature-data.service';
import { FeatureDataService } from 'src/feature-data/feature-data.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly featureDataService: FeatureDataService,
  ) {}

  @Query(() => Profile, { nullable: true })
  @UseGuards(GqlAuthGuard)
  public async getProfile(
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.profileService.getProfileByUserId(userId);
  }

  @ResolveField('features', () => [FeatureData])
  async getFeatures(@Parent() profile: Profile) {
    return this.featureDataService.getEnabledFeaturesForUser(profile);
  }
}
