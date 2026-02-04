import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileEntity, ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProfileEntity.name, schema: ProfileSchema },
    ]),
  ],
  exports: [ProfileService],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
