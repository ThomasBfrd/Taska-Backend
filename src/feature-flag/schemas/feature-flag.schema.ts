import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeatureFlagDocument = FeatureFlagEntity & Document;

@Schema()
export class FeatureFlagEntity {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  enabled: boolean;
}

export const FeatureFlagSchema =
  SchemaFactory.createForClass(FeatureFlagEntity);
