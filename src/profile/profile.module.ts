import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileEntity, ProfileSchema } from './schemas/profile.schema';
import { FeatureDataModule } from 'src/feature-data/feature-data.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProfileEntity.name, schema: ProfileSchema },
    ]),
    FeatureDataModule,
  ],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
