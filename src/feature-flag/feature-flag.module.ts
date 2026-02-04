import { Module } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';
import { FeatureFlagResolver } from './feature-flag.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FeatureFlagEntity,
  FeatureFlagSchema,
} from './schemas/feature-flag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeatureFlagEntity.name, schema: FeatureFlagSchema },
    ]),
  ],
  exports: [FeatureFlagService],
  providers: [FeatureFlagResolver, FeatureFlagService],
})
export class FeatureFlagModule {}
