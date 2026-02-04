import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FeatureFlagEntity,
  FeatureFlagDocument,
} from './schemas/feature-flag.schema';
import { FeatureFlag } from './types/feature-flag.type';

@Injectable()
export class FeatureFlagService {
  public constructor(
    @InjectModel(FeatureFlagEntity.name)
    private featuresFlagsModel: Model<FeatureFlagDocument>,
  ) {}

  public async getEnabledFeatures(): Promise<Array<FeatureFlag>> {
    const features = await this.featuresFlagsModel.find({ enabled: true });

    if (!features)
      throw new NotFoundException('Enabled features not found in database');

    return features;
  }
}
