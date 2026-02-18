import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FeatureFlag {
  @Field()
  id: string;

  @Field()
  key: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int)
  rollout?: number;

  @Field()
  enabled: boolean;
}
