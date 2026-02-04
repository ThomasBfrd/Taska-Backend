import { Resolver } from '@nestjs/graphql';
import { FeatureAccessService } from './feature-access.service';

@Resolver()
export class FeatureAccessResolver {
  constructor(private readonly featureAccessService: FeatureAccessService) {}
}
