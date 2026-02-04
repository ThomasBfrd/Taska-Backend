import { Injectable, NotFoundException } from '@nestjs/common';
import { FeatureAccess } from './types/feature-access.type';
import { InjectModel } from '@nestjs/mongoose';
import {
  FeatureAccessDocument,
  FeatureAccessEntity,
} from './schemas/feature-access.schema';
import { Model } from 'mongoose';

@Injectable()
export class FeatureAccessService {
  constructor(
    @InjectModel(FeatureAccessEntity.name)
    private readonly featureAccessModel: Model<FeatureAccessDocument>,
  ) {}

  public async getAllowedFeatures(
    userRole: string,
  ): Promise<Array<FeatureAccess>> {
    const allowedFeatures = await this.featureAccessModel
      .find({
        role: userRole,
      })
      .lean();

    if (allowedFeatures.length === 0)
      throw new NotFoundException('No allowed features found for this role');

    return allowedFeatures.map((feature: FeatureAccessDocument) => ({
      id: feature._id.toString(),
      featureId: feature.featureId,
      role: feature.role,
    }));
  }
}
