import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { FeatureAccessService } from 'src/feature-access/feature-access.service';
import { FeatureAccess } from 'src/feature-access/types/feature-access.type';
import { FeatureFlagService } from 'src/feature-flag/feature-flag.service';
import { FeatureFlag } from 'src/feature-flag/types/feature-flag.type';
import {
  FeatureData,
  ProfileFeatureDataService,
} from 'src/profile-feature-data/profile-feature-data.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/types/profile.type';

@Injectable()
export class FeatureDataService {
  public constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly profileService: ProfileService,
    private readonly featuresFlagService: FeatureFlagService,
    private readonly featureAccessService: FeatureAccessService,
    private readonly profileFeatureDataService: ProfileFeatureDataService,
  ) {}

  public async getEnabledFeaturesForUser(
    userId: string,
  ): Promise<Array<FeatureData>> {
    const cacheKey: string = `features:${userId}`;
    const cached: Array<FeatureData> | undefined =
      await this.cacheManager.get<Array<FeatureData>>(cacheKey);

    if (cached) return cached;

    const profile: Profile = await this.profileService.getProfileById(userId);

    const enabledFeatures: Array<FeatureFlag> =
      await this.featuresFlagService.getEnabledFeatures();

    const allowedFeatures: Array<FeatureAccess> =
      await this.featureAccessService.getAllowedFeatures(profile.role);

    const features: Array<FeatureFlag> = enabledFeatures.filter(
      (feature: FeatureFlag) =>
        allowedFeatures.some(
          (allowedFeature: FeatureAccess) =>
            allowedFeature.featureId === feature.id,
        ),
    );

    const featuresData: FeatureData[] =
      await this.profileFeatureDataService.getFeatureData(features, profile.id);

    await this.cacheManager.set(cacheKey, featuresData, 300);

    return featuresData;
  }
}
