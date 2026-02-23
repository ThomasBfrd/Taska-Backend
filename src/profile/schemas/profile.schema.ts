import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLES } from '../enums/roles.enum';
import { IsEnum } from 'class-validator';

export type ProfileDocument = ProfileEntity & Document;

@Schema()
export class ProfileEntity {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: String, enum: ROLES, default: ROLES.EMPLOYEE })
  @IsEnum(ROLES, {
    message: 'role must to be one of: employee, manager, admin',
  })
  role: ROLES;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  birthDay: string;

  @Prop({ required: true })
  tel: string;

  @Prop({
    default:
      'https://res.cloudinary.com/de7kgkvgt/image/upload/taska-imgProfile.png',
  })
  profileImg: string;
}

export const ProfileSchema = SchemaFactory.createForClass(ProfileEntity);
