import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileFeatureDataDocument = ProfileFeatureDataEntity &
  Document & {
    _id: Types.ObjectId;
  };

@Schema()
export class ProfileFeatureDataEntity {
  @Prop()
  profileId: string;

  @Prop()
  featureId: string;

  @Prop()
  data: Array<string>;
}

export const ProfileFeatureDataSchema = SchemaFactory.createForClass(
  ProfileFeatureDataEntity,
);
