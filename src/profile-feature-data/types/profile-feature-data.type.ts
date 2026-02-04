import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileFeatureData {
  @Field()
  id: string;

  @Field()
  profileId: string;

  @Field()
  featureId: string;

  @Field()
  data: Array<string>;
}
