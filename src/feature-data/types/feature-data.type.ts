import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FeatureData {
  @Field()
  featureKey: string;

  @Field(() => [String])
  data: Array<string>;

  @Field({ nullable: true })
  genericData?: boolean;
}
