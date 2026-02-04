import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ProfileFeatureDataDocument,
  ProfileFeatureDataEntity,
} from './schemas/profile-feature-data.schema';
import { Model } from 'mongoose';
import { FeatureFlag } from 'src/feature-flag/types/feature-flag.type';
import { FeatureData } from 'src/feature-data/types/feature-data.type';
import { ProfileFeatureData } from './types/profile-feature-data.type';

@Injectable()
export class ProfileFeatureDataService {
  public constructor(
    @InjectModel(ProfileFeatureDataEntity.name)
    private readonly profileModel: Model<ProfileFeatureDataDocument>,
  ) {}
  public async getFeatureData(
    features: Array<FeatureFlag>,
    profileId: string,
  ): Promise<Array<FeatureData>> {
    const featuresId: Array<string> = features.map(
      (feature: FeatureFlag) => feature.id,
    );

    const [persoData, genericData] = await Promise.all([
      this.profileModel.find({
        featureId: { $in: featuresId },
        profileId: profileId,
      }),
      this.profileModel.find({
        featureId: { $in: featuresId },
        profileId: null,
      }),
    ]);

    return features.map((feature: FeatureFlag) => {
      const perso = persoData.find(
        (data: ProfileFeatureData) => data.featureId === feature.id,
      );
      const generic = genericData.find(
        (data: ProfileFeatureData) => data.featureId === feature.id,
      );

      return {
        featureKey: feature.key,
        data: perso?.data || generic?.data || [],
      };
    });
  }
}
export { FeatureData };
