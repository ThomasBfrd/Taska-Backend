import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileDocument, ProfileEntity } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { Profile } from './types/profile.type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(ProfileEntity.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  public async getProfileById(profileId: string): Promise<Profile> {
    const profile: Profile | null = await this.profileModel.findOne({
      _id: profileId,
    });

    if (!profile)
      throw new NotFoundException(`Profile ${profileId} not found in database`);

    return profile;
  }
}
