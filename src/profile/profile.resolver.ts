import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './types/profile.type';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { nullable: true })
  public async getProfile(
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.profileService.getProfileById(userId);
  }
}
