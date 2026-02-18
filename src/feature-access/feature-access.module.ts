import { Module } from '@nestjs/common';
import { FeatureAccessResolver } from './feature-access.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FeatureAccessEntity,
  FeatureAccessSchema,
} from './schemas/feature-access.schema';
import { FeatureAccessService } from './feature-access.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeatureAccessEntity.name, schema: FeatureAccessSchema },
    ]),
  ],
  providers: [FeatureAccessResolver, FeatureAccessService],
  exports: [FeatureAccessService],
})
export class FeatureAccessModule {}
