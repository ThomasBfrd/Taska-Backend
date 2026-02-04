import { Module } from '@nestjs/common';
import { ProfileFeatureDataService } from './profile-feature-data.service';
import { ProfileFeatureDataResolver } from './profile-feature-data.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProfileFeatureDataEntity,
  ProfileFeatureDataSchema,
} from './schemas/profile-feature-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProfileFeatureDataEntity.name, schema: ProfileFeatureDataSchema },
    ]),
  ],
  providers: [ProfileFeatureDataResolver, ProfileFeatureDataService],
  exports: [ProfileFeatureDataService],
})
export class ProfileFeatureDataModule {}
