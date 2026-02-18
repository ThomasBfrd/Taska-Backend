import { Module } from '@nestjs/common';
import { FeatureDataService } from './feature-data.service';
import { FeatureDataResolver } from './feature-data.resolver';
import { FeatureAccessModule } from 'src/feature-access/feature-access.module';
import { ProfileFeatureDataModule } from 'src/profile-feature-data/profile-feature-data.module';
import { FeatureFlagModule } from 'src/feature-flag/feature-flag.module';

@Module({
  imports: [FeatureAccessModule, ProfileFeatureDataModule, FeatureFlagModule],
  providers: [FeatureDataResolver, FeatureDataService],
  exports: [FeatureDataService],
})
export class FeatureDataModule {}
