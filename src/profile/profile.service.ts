import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileDocument, ProfileEntity } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { Profile } from './types/profile.type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(ProfileEntity.name)
    private readonly profileModel: Model<ProfileDocument>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  public async getProfileByUserId(userId: string): Promise<Profile> {
    const cacheUserIdKey: string = `profile:${userId}`;

    const cachedProfile: Profile | undefined =
      await this.getCachedProfile(cacheUserIdKey);

    if (cachedProfile) {
      return cachedProfile;
    }

    const profile = await this.profileModel.findOne({ userId }).lean();

    if (!profile)
      throw new NotFoundException(`Profile ${userId} not found in database`);

    const result: Profile = {
      id: profile._id.toString(),
      ...profile,
    };

    await this.cacheManager.set(cacheUserIdKey, result, 300);

    return result;
  }

  private async getCachedProfile(
    cacheKey: string,
  ): Promise<Profile | undefined> {
    const cache: Profile | undefined = await this.cacheManager.get<
      Profile | undefined
    >(cacheKey);

    return cache;
  }
}
