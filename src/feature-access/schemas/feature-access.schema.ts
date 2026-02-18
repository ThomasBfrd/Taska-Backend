import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type FeatureAccessDocument = FeatureAccessEntity &
  Document & {
    _id: Types.ObjectId;
  };

@Schema()
export class FeatureAccessEntity {
  @Prop()
  featureId: string;

  @Prop()
  role: string;
}

export const FeatureAccessSchema =
  SchemaFactory.createForClass(FeatureAccessEntity);
