import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FeatureAccess {
  @Field()
  id: string;

  @Field()
  featureId: string;

  @Field()
  role: string;
}
